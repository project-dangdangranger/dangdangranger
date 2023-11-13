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
	TouchableOpacity,
	Alert,
} from "react-native";
import { Buffer } from "buffer";
import MapboxGL, { MarkerView } from "@rnmapbox/maps";
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
import missingIcon from "../../assets/images/missing-marker.png";
import { Callout } from "react-native-maps";
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
	missingNo: number;
	missingLat: number;
	missingLng: number;
};

const FindMap = (props: Props) => {
	const mapRef = useRef<MapboxGL.MapView>(null);
	const mapWidth = Dimensions.get("window").width;
	const mapHeight = Dimensions.get("window").height;
	const [camera, setCamera] = useState({
		centerCoordinate: [126.9779692, 37.566535],
		zoomLevel: 15,
		animationDuration: 0,
	});

	const [currentLocation, setCurrentLocation] = useState<
		LocationCoordinates | undefined
	>();
	const [missingLocation, setMissingLocation] = useState([0, 0]);
	const [showPopUp, setShowPopUp] = useState(false);
	const [isInitialLocationSet, setIsInitialLocationSet] =
		useState<boolean>(false);
	const watchIdRef = useRef<number | null>(null);

	const clearLocationWatch = () => {
		if (watchIdRef.current !== null) {
			Geolocation.clearWatch(watchIdRef.current);
			watchIdRef.current = null;
		}
	};

	useEffect(() => {
		MapboxGL.setTelemetryEnabled(false);
		requestLocationPermission();
		setMissingLocation([props.missingLng, props.missingLat]);
	}, []);

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

	// *** 지도의 시점을 currentLocation에 맞춰서 움직여 주기 ***
	useEffect(() => {
		if (currentLocation) {
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
				setIsInitialLocationSet(true);
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
				console.log("새 위치: ", newLocation);
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, distanceFilter: 10 },
		);
	};

	// *** 실종견 마커 팝업 ***
	const handlePopUp = () => {
		//setShowPopUp(!showPopUp);
		Alert.alert("팝업 띄우고 싶다");
	};

	const handleRegionChange = () => {
		// setShowPopUp(false);
	};

	return (
		<MapboxGL.MapView style={styles.map} ref={mapRef}>
			{currentLocation && (
				<MapboxGL.Camera
					zoomLevel={camera.zoomLevel}
					centerCoordinate={camera.centerCoordinate}
					animationMode={"flyTo"}
					animationDuration={camera.animationDuration}
				/>
			)}

			<MapboxGL.MarkerView coordinate={missingLocation}>
				<TouchableOpacity onPress={handlePopUp}>
					<Image source={missingIcon} style={styles.icon} />
				</TouchableOpacity>
			</MapboxGL.MarkerView>
			{showPopUp && (
				<View style={styles.popup}>
					<Text>실종견 간단 정보입니다.</Text>
				</View>
			)}
		</MapboxGL.MapView>
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
		flex: 1,
		width: Dimensions.get("window").width,
		height: responsiveHeight(92),
	},
	icon: {
		width: 50,
		height: 50,
	},
	popup: {
		position: "absolute",
		top: 50,
		left: 50,
		backgroundColor: "red",
		padding: 10,
		borderRadius: 6,
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
});

export default FindMap;
