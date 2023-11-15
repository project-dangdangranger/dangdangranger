import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Button,
	StyleSheet,
	PermissionsAndroid,
	Dimensions,
	Platform,
	Image,
	Text,
} from "react-native";
import { Buffer } from "buffer";
import MapboxGL from "@rnmapbox/maps";
import { MAPBOX_ACCESSTOKEN } from "@env";
import Geolocation from "react-native-geolocation-service";
import { S3 } from "aws-sdk";
import {
	AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY,
	GEOCODING_API_KEY,
	AWS_REGION,
	AWS_BUCKET,
} from "@env";
import axios from "../utils/axios";
import Axios from "axios";
import haversine from "haversine";
import { responsiveHeight } from "react-native-responsive-dimensions";

MapboxGL.setWellKnownTileServer("Mapbox");
MapboxGL.setAccessToken(MAPBOX_ACCESSTOKEN);

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
	const mapRef = useRef<MapboxGL.MapView>(null);
	const mapWidth = Dimensions.get("window").width;
	const mapHeight = Dimensions.get("window").height;
	const [camera, setCamera] = useState({
		centerCoordinate: [0, 0],
		zoomLevel: 15,
		animationDuration: 0,
	});

	const [currentLocation, setCurrentLocation] = useState<
		LocationCoordinates | undefined
	>();
	const [postalCode, setPostalCode] = useState<string>("");
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
		MapboxGL.setTelemetryEnabled(false);
		requestLocationPermission();
	}, []);

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
				console.log("몇분 됐지??? : ", patrolLogTotalTime);
			}, 60000);
			return () => clearInterval(interval);
		}
	}, [props.start, props.patrol]);

	useEffect(() => {
		if (!props.start && !props.patrol) {
			clearLocationWatch();
			console.log("중지 했습니다.!");
			saveAndUploadMapSnapshot();
		}
	}, [props.start, props.patrol]);

	const requestLocationPermission = async () => {
		if (Platform.OS === "android") {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				);
				if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					getCurrentLocation();
				} else {
					console.log("ACCESS_FINE_LOCATION permission denied");
				}
			} catch (err) {
				console.warn(err);
			}
		}
	};

	useEffect(() => {
		if (!isInitialLocationSet && props.start && props.patrol) {
			getCurrentLocation();
		}
	}, [isInitialLocationSet]);

	useEffect(() => {
		// patrolLogTotalDistance가 변할때마다 콘솔
		console.log("patrolLogTotalDistance: ", patrolLogTotalDistance);
	}, [patrolLogTotalDistance]);

	useEffect(() => {
		if (currentLocation) {
			// Set the camera once the current location is available
			setCamera({
				...camera,
				centerCoordinate: [currentLocation.longitude, currentLocation.latitude],
				animationDuration: 2000,
			});
		}
	}, [currentLocation]);

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

				getAddressCode(position.coords.latitude, position.coords.longitude);

				// if (mapRef.current) {
				// 	mapRef.current.animateToRegion(newLocation, 1000);
				// }
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	};

	const getAddressCode = async (latitude: number, longitude: number) => {
		try {
			console.log("지도다!!!");

			const response = await Axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&location_type=ROOFTOP&result_type=street_address&language=ko&key=${GEOCODING_API_KEY}`,
			);
			setPostalCode(response.data.results[0].address_components[5].long_name);
			console.log(
				"우편번호: ",
				response.data.results[0].address_components[5].long_name,
			);
		} catch (error) {
			console.error("An error occurred while fetching the dong code:", error);
		}
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
					const distanceInKilometers = distance / 10000;
					setPatrolLogTotalDistance(
						(prevDistance) => prevDistance + distanceInKilometers,
					);
				}

				setCurrentLocation(newLocation);
				console.log("새 위치: ", newLocation);
				setLocationTrail((prev) => {
					// 새 배열 상태를 콘솔에 출력
					console.log("업데이트된 위치 배열: ", [...prev, newLocation]);
					return [...prev, newLocation];
				});
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, distanceFilter: 10 },
		);
	};

	const saveAndUploadMapSnapshot = async () => {
		try {
			const snapshotUri = await MapboxGL.snapshotManager.takeSnap({
				centerCoordinate: [
					currentLocation?.longitude,
					currentLocation?.latitude,
				],
				width: 300,
				height: 500,
				zoomLevel: 12,
				pitch: 30,
				heading: 20,
				styleURL: MapboxGL.StyleURL.Street,
				withLogo: false,
			});

			const fronttmp = snapshotUri.substring(0, 30);
			console.log("fronttmp : ", fronttmp);

			// console.log("Snapshot URI:", snapshotUri);
			if (snapshotUri.startsWith("data:image/png;base64,")) {
				await uploadImage(snapshotUri);
			}
		} catch (error) {
			console.error("Snapshot failed:", error);
		}
	};

	const uploadImage = async (imageBase64: string) => {
		// 접두어를 제거하고 base64 로 만들어야함
		const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
		const buffer = Buffer.from(base64Data, "base64");

		// const blob = Buffer.from(imageBase64, "base64");
		const random = Math.floor(Math.random() * 100000000);
		const filename = `map_${new Date().toISOString()}_${random}.png`;
		const params = {
			Bucket: AWS_BUCKET,
			Key: filename,
			// Body: blob,
			Body: buffer,
			ContentType: "image/png",
		};

		const data = await s3.upload(params).promise();
		console.log("File uploaded:", data);
		console.log(data.Location);
		const res = {
			postalCode,
			patrolLogDate,
			patrolLogTotalDistance,
			patrolLogTotalTime: patrolLogTotalTime,
			patrolLogImageUrl: data.Location,
			patrolLogLat,
			patrolLogLng,
		};
		console.log(res);
		await axios.post("/log", res);
		stopAndReset();
	};

	return (
		<View style={styles.page}>
			<MapboxGL.MapView style={styles.map} ref={mapRef}>
				{currentLocation && (
					<MapboxGL.Camera
						zoomLevel={camera.zoomLevel}
						centerCoordinate={camera.centerCoordinate}
						animationMode={"flyTo"}
						animationDuration={camera.animationDuration}
					/>
				)}
				<MapboxGL.ShapeSource
					id="line1"
					shape={{
						type: "Feature",
						geometry: {
							type: "LineString",
							coordinates: locationTrail.map((loc) => [
								loc.longitude,
								loc.latitude,
							]),
						},
					}}
				>
					<MapboxGL.LineLayer
						id="linelayer1"
						style={{ lineWidth: 5, lineColor: "blue" }}
					/>
				</MapboxGL.ShapeSource>
			</MapboxGL.MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	map: {
		// marginTop: responsiveHeight(10),
		flex: 1,
		// position: "absolute",
		width: Dimensions.get("window").width,
		height: responsiveHeight(40),
		// opacity: 0,
		// left: -Dimensions.get("window").width,
	},
});

export default GoogleMap;
