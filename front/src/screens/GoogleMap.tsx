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
	const [location, setLocation] = useState();

	useEffect(() => {
		requeestPermission().then((result) => {
			console.log("request permission : ", result);

			if (result === "granted") {
				Geolocation.getCurrentPosition(
					(position) => {
						console.log("현재 위치 : ", position);
						setLocation(position.coords);
					},
					(error) => {
						console.log("에러 발생!!", error);
					},
					{
						enableHighAccuracy: true,
						timeout: 3600,
						maximumAge: 3600,
					},
				);
			} else {
				console.log("not granted");
			}
		});
	}, []);

	console.log(location);
	async function requeestPermission() {
		try {
			return await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			);
		} catch (e) {
			console.log(e);
		}
	}

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
						latitude: location.latitude,
						longitude: location.longitude,
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
