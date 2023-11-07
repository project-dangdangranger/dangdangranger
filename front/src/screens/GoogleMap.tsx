import React, { useEffect, useState, useRef } from "react";
import { View, PermissionsAndroid, Dimensions, Button } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { S3 } from "aws-sdk";
import {
	AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION,
	AWS_BUCKET,
} from "@env";
import { Buffer } from "buffer";
import axios from "../utils/axios";
import haversine from "haversine";

type LocationCoordinates = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

type Props = {
	start: boolean;
	patrol: boolean;
	setStart: (start: boolean) => void;
	setPatrol: (patrol: boolean) => void;
};

const GoogleMap = (props: Props) => {
	const mapWidth = Dimensions.get("window").width;
	const mapHeight = Dimensions.get("window").height;
	const [currentLocation, setCurrentLocation] = useState<
		LocationCoordinates | undefined
	>();
	const [patrolLogDate, setPatrolLogDate] = useState<string>("");
	const [patrolLogLat, setPatrolLogLat] = useState<number>(0);
	const [patrolLogLng, setPatrolLogLng] = useState<number>(0);
	const [patrolLogTotalTime, setPatrolLogTotalTime] = useState<number>(0);
	const [patrolLogTotalDistance, setPatrolLogTotalDistance] =
		useState<number>(0);
	const [isInitialLocationSet, setIsInitialLocationSet] =
		useState<boolean>(false);
	const [locationTrail, setLocationTrail] = useState<LocationCoordinates[]>([]);
	const watchIdRef = useRef<number | null>(null);
	const mapRef = useRef<MapView | null>(null);

	const s3 = new S3({
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: AWS_REGION,
	});

	const clearLocationWatch = () => {
		if (watchIdRef.current !== null) {
			Geolocation.clearWatch(watchIdRef.current);
			watchIdRef.current = null;
		}
	};
	const stopAndReset = () => {
		setPatrolLogDate("");
		setPatrolLogLat(0);
		setPatrolLogLng(0);
		setPatrolLogTotalTime(0);
		setIsInitialLocationSet(false);
		setLocationTrail([]);
		setCurrentLocation(undefined);
		setPatrolLogTotalDistance(0);
	};

	useEffect(() => {
		if (props.start && props.patrol && !watchIdRef.current) {
			console.log("시작 했습니다.!");
			console.log("patrolLogDate: ", patrolLogDate);
			console.log("patrolLogLat: ", patrolLogLat);
			console.log("patrolLogLng: ", patrolLogLng);
			const response = axios.post("/patrol/start");
			console.log("response : ", response);
			watchIdRef.current = startWatchingLocation();
			const interval = setInterval(() => {
				setPatrolLogTotalTime((prev) => prev + 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [props.start, props.patrol]);

	useEffect(() => {
		if (!props.start && !props.patrol) {
			clearLocationWatch();
			console.log("중지 했습니다.!");
			// saveAndUploadMapSnapshot();
			stopAndReset();
		}
	}, [props.start, props.patrol]);

	useEffect(() => {
		requestPermission();
	}, []);

	useEffect(() => {
		if (!isInitialLocationSet) {
			getCurrentLocation();
		}
	}, [isInitialLocationSet]);

	useEffect(() => {
		// patrolLogTotalDistance가 변할때마다 콘솔
		console.log("patrolLogTotalDistance: ", patrolLogTotalDistance);
	}, [patrolLogTotalDistance]);

	const requestPermission = async () => {
		try {
			const result = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			);
			if (result === PermissionsAndroid.RESULTS.GRANTED) {
				getCurrentLocation();
			} else {
				console.log("ACCESS_FINE_LOCATION permission denied");
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getCurrentLocation = () => {
		Geolocation.getCurrentPosition(
			(position) => {
				const newLocation: LocationCoordinates = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.015,
					longitudeDelta: 0.015,
				};
				setCurrentLocation(newLocation);
				setLocationTrail([newLocation]);
				setPatrolLogDate(new Date().toISOString().slice(0, 19));
				setPatrolLogLat(position.coords.latitude);
				setPatrolLogLng(position.coords.longitude);
				setIsInitialLocationSet(true);
				if (mapRef.current) {
					mapRef.current.animateToRegion(newLocation, 1000);
				}
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	};

	const startWatchingLocation = () => {
		return Geolocation.watchPosition(
			(position) => {
				const newLocation: LocationCoordinates = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.009,
					longitudeDelta: 0.009,
				};

				if (locationTrail.length > 0) {
					const start = {
						latitude: locationTrail[locationTrail.length - 1].latitude,
						longitude: locationTrail[locationTrail.length - 1].longitude,
					};
					const end = {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					};
					const distance = haversine(start, end, { unit: "meter" });
					const distanceInKilometers = distance / 1000;
					setPatrolLogTotalDistance(
						(prevDistance) => prevDistance + distanceInKilometers,
					);
				}

				setCurrentLocation(newLocation);
				setLocationTrail((prev) => [...prev, newLocation]);
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, distanceFilter: 10 },
		);
	};

	const saveAndUploadMapSnapshot = async () => {
		if (mapRef.current) {
			const snapshot = await mapRef.current.takeSnapshot({
				width: mapWidth,
				height: mapHeight,
				format: "png",
				quality: 1,
				result: "base64",
			});
			await uploadImage(snapshot);
		}
	};

	const uploadImage = async (imageBase64: string) => {
		const blob = Buffer.from(imageBase64, "base64");
		const random = Math.floor(Math.random() * 100000000);
		const filename = `map_${new Date().toISOString()}_${random}.png`;
		const params = {
			Bucket: AWS_BUCKET,
			Key: filename,
			Body: blob,
			ContentType: "image/png",
		};

		try {
			const data = await s3.upload(params).promise();
			console.log("File uploaded:", data);
			console.log(data.Location);
			// 현재 위치가 어떤 동인지, 어떤 거리인지 알아야함
			const res = {
				dong: "1111010100", // 동
				patrolLogDate,
				patrolLogTotalDistance,
				patrolLogTotalTime: patrolLogTotalTime / 60,
				patrolLogImageUrl: data.Location,
				patrolLogLat,
				patrolLogLng,
			};
			await axios.post("/log", res);
		} catch (err) {
			console.error("Upload failed:", err);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={{
					position: "absolute",
					width: Dimensions.get("window").width,
					height: Dimensions.get("window").height,
					opacity: 0,
					left: -Dimensions.get("window").width,
				}}
				provider={PROVIDER_GOOGLE}
				showsUserLocation={true}
				showsMyLocationButton={true}
				zoomEnabled={true}
				rotateEnabled={true}
				initialRegion={currentLocation}
				ref={mapRef}
			>
				{locationTrail.length > 0 && (
					<Polyline
						coordinates={locationTrail}
						strokeColor="#000"
						strokeWidth={4}
					/>
				)}
			</MapView>
			<View
				style={{
					position: "absolute",
					bottom: 20,
					left: 0,
					right: 0,
					alignItems: "center",
				}}
			>
				<Button
					title="Save and Upload Map Snapshot"
					onPress={saveAndUploadMapSnapshot}
				/>
			</View>
		</View>
	);
};

export default GoogleMap;
