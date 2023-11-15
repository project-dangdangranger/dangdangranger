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
import MapboxGL, { MarkerView } from "@rnmapbox/maps";
import { MAPBOX_ACCESSTOKEN } from "@env";
import Geolocation from "react-native-geolocation-service";
import { GEOCODING_API_KEY } from "@env";
import axios from "../utils/axios";
import missingIcon from "../../assets/images/missing-marker.png";
import rangerIcon from "../../assets/images/dd-ranger-icon.png";
import { Callout } from "react-native-maps";
import { responsiveHeight } from "react-native-responsive-dimensions";

MapboxGL.setWellKnownTileServer("Mapbox");
MapboxGL.setAccessToken(MAPBOX_ACCESSTOKEN);

type Props = {
	missingNo: number;
	missingLat: number;
	missingLng: number;
	findingList: Array<{ userNo: number; lat: number; lng: number }>;
	myLongitude: number;
	myLatitude: number;
};

const FindMap = (props: Props) => {
	const mapRef = useRef<MapboxGL.MapView>(null);
	const [camera, setCamera] = useState({
		centerCoordinate: [126.9779692, 37.566535],
		// centerCoordinate: [props.missingLng, props.missingLat],
		zoomLevel: 15,
		animationDuration: 0,
	});

	const [missingLocation, setMissingLocation] = useState([0, 0]);
	const [showPopUp, setShowPopUp] = useState(false);

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
					// getCurrentLocation();
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
		console.log("testtesttesttesttesttesttesttesttest");
		setCamera({
			...camera,
			centerCoordinate: [props.missingLng, props.missingLat],
			animationDuration: 2000,
		});
	}, [props.missingLng, props.missingLat]);

	// *** 실종견 마커 팝업 ***
	const handlePopUp = () => {
		setShowPopUp(!showPopUp);
		console.log("");
		// Alert.alert("팝업 띄우고 싶다");
	};

	return (
		<MapboxGL.MapView style={styles.map} ref={mapRef}>
			<MapboxGL.Camera
				zoomLevel={camera.zoomLevel}
				centerCoordinate={camera.centerCoordinate}
				animationMode={"flyTo"}
				animationDuration={camera.animationDuration}
			/>
			{props.myLatitude && props.myLongitude && (
				<MapboxGL.MarkerView coordinate={[props.myLongitude, props.myLatitude]}>
					<Image source={rangerIcon} style={styles.icon} />
				</MapboxGL.MarkerView>
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
			{props.findingList.map((location, index) => (
				<MapboxGL.MarkerView
					coordinate={[location.lng, location.lat]}
					key={location.userNo}
				>
					<Image source={rangerIcon} style={styles.icon} />
				</MapboxGL.MarkerView>
			))}
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
		backgroundColor: "black",
		padding: 10,
		borderRadius: 6,
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
});

export default FindMap;
