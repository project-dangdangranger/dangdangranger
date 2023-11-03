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

type Location = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

const GoogleMap = () => {
	const mapWidth = Dimensions.get("window").width;
	const mapHeight = Dimensions.get("window").height;
	const [location, setLocation] = useState<Location | undefined>();
	const [positions, setPositions] = useState<Location[]>([]);
	const [watchId, setWatchId] = useState<number | null>(null);
	const mapRef = useRef<MapView | null>(null);

	const s3 = new S3({
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: AWS_REGION,
	});

	useEffect(() => {
		requestPermission();
		const id = startWatchingLocation();
		setWatchId(id);

		return () => {
			if (watchId !== null) {
				Geolocation.clearWatch(watchId);
			}
		};
	}, []);

	const requestPermission = async () => {
		try {
			const result = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			);

			if (result === PermissionsAndroid.RESULTS.GRANTED) {
				getCurrentLocation();
			} else {
				console.log("ACCESS_FINE_LOCATION Permission denied");
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getCurrentLocation = () => {
		Geolocation.getCurrentPosition(
			(position) => {
				const newLocation: Location = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.009,
					longitudeDelta: 0.009,
				};
				setLocation(newLocation);
				setPositions([newLocation]);
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
				const newLocation: Location = {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.009,
					longitudeDelta: 0.009,
				};
				setLocation(newLocation);
				setPositions((prev) => [...prev, newLocation]);
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
				quality: 0.8, // 이미지 품질
				result: "base64",
			});
			await uploadImage(snapshot);
		}
	};

	const uploadImage = async (imageUri: string) => {
		// console.log("img", imageUri);
		const blob = Buffer.from(imageUri, "base64");
		// console.log("blob : ", blob);
		// key는 오늘날짜, 시간
		const params = {
			Bucket: AWS_BUCKET,
			Key: `${new Date().toISOString()}.png`,
			Body: blob,
			ContentType: "image/png",
		};

		try {
			const data = await s3.upload(params).promise();
			console.log("File uploaded:", data);
			// 업로드 후의 로직 (예: URL을 서버에 저장하는 등)
		} catch (err) {
			console.error("Upload failed:", err);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={{ width: 500, height: 500 }}
				provider={PROVIDER_GOOGLE}
				showsUserLocation={true}
				showsMyLocationButton={true}
				zoomEnabled={true}
				rotateEnabled={true}
				initialRegion={location}
				ref={mapRef}
			>
				<Polyline coordinates={positions} strokeColor="#000" strokeWidth={4} />
			</MapView>
			<Button
				title="Save and Upload Map Snapshot"
				onPress={saveAndUploadMapSnapshot}
			/>
		</View>
	);
};

export default GoogleMap;
