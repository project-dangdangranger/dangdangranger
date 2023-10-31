import { useEffect, useState } from "react";
import { Text, View, PermissionsAndroid } from "react-native";
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
						setLocation(position.coords);
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
		<View style={{ flex: 1 }}>
			<MapView
				style={{ flex: 1 }}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				<Marker
					coordinate={location}
					title="My Location"
					description="This is my current location"
				/>
			</MapView>
		</View>
	);
};

export default GoogleMap;
