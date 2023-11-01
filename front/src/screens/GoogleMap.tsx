import React, { useEffect, useState } from "react";
import { Text, View, PermissionsAndroid, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

type Location = {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
};

const GoogleMap = () => {
	const mapWidth = Dimensions.get("window").width;
	const mapHeight = Dimensions.get("window").height;
	const [location, setLocation] = useState<Location | null>(null);
	const [positions, setPositions] = useState<Location[]>([]);
	const [watchId, setWatchId] = useState<number | null>(null);

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

	if (!location) {
		return (
			<View>
				<Text>Location 없음</Text>
			</View>
		);
	}

	return (
		<View style={{ flex: 1 }}>
			<MapView
				style={{ width: mapWidth, height: mapHeight }}
				provider={PROVIDER_GOOGLE}
				showsUserLocation={true}
				showsMyLocationButton={true}
				zoomEnabled={true}
				rotateEnabled={true}
				initialRegion={location}
			>
				<Polyline
					coordinates={positions}
					strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
					strokeWidth={4}
				/>
			</MapView>
		</View>
	);
};

export default GoogleMap;
