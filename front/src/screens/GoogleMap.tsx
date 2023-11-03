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

type LocationCoordinates = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

type Props = {
	startTracking: string;
	stopTracking: string;
};

const GoogleMap = (props: Props) => {
	const mapWidth = Dimensions.get("window").width;
	const mapHeight = Dimensions.get("window").height;
	const [currentLocation, setCurrentLocation] = useState<
		LocationCoordinates | undefined
	>();
	const [locationTrail, setLocationTrail] = useState<LocationCoordinates[]>([]);
	const watchIdRef = useRef<number | null>(null);
	const mapRef = useRef<MapView | null>(null);

	const s3 = new S3({
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: AWS_REGION,
	});

	useEffect(() => {
		requestPermission();
	}, []);

	useEffect(() => {
		if (props.startTracking) {
			const id = startWatchingLocation();
			watchIdRef.current = id;
		} else {
			if (watchIdRef.current !== null) {
				Geolocation.clearWatch(watchIdRef.current);
				watchIdRef.current = null;
			}
		}
	}, [props.startTracking]);

	useEffect(() => {
		if (props.stopTracking) {
			saveAndUploadMapSnapshot();
		}
	}, [props.stopTracking]);

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
