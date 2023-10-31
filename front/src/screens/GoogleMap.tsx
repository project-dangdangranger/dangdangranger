import { useEffect, useRef, useState } from "react";
import {
	Text,
	View,
	Image,
	Alert,
	TouchableOpacity,
	PermissionsAndroid,
} from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";

const GoogleMap = ({ navigation }: any) => {
	const [location, setLocation] = useState(null as any);

	useEffect(() => {
		requestPermission();
	}, []);

	const requestPermission = async () => {
		try {
			const result = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			);
			if (result === PermissionsAndroid.RESULTS.GRANTED) {
				Geolocation.getCurrentPosition(
					(position) => {
						console.log("position : ", position);
						setLocation(position);
					},
					(error) => {
						console.error("error.code : ", error.message);
						console.log(error.code, error.message);
					},
					{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
				);
				console.log("ACCESS_FINE_LOCATION Permission granted");
			} else {
				console.log("ACCESS_FINE_LOCATION Permission denied");
			}
			console.log("RESULT : ", result);
		} catch (e) {
			console.log(e);
		}
	};

	if (!location) {
		return (
			<View>
				<Text>Location 없음</Text>
			</View>
		);
	}

	return (
		<>
			<View style={{ flex: 1 }}>
				<Marker
					coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
					title="this is a marker"
					description="this is a marker example"
				/>
				<MapView
					style={{ flex: 1 }}
					provider={PROVIDER_GOOGLE}
					initialRegion={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}}
					// onUserLocationChange={}
				/>
			</View>
		</>
	);
};

export default GoogleMap;
