import { useEffect, useState } from "react";
import { Text, View, PermissionsAndroid, Dimensions } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
const GoogleMap = ({ navigation }: any) => {
	const mapWidth = Dimensions.get("window").width;
	const mapHeight = Dimensions.get("window").height;
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
				console.log("ACCESS_FINE_LOCATION Permission granted");
				Geolocation.getCurrentPosition(
					(position) => {
						console.log(position);
						setLocation({
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
							latitudeDelta: 0.009,
							longitudeDelta: 0.009,
						});
					},
					(error) => {
						console.log(error.code, error.message);
					},
					{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
				);
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
				style={{ width: mapWidth, height: mapHeight }}
				provider={PROVIDER_GOOGLE}
				showsUserLocation={true}
				showsMyLocationButton={true}
				zoomEnabled={true}
				rotateEnabled={true}
				initialRegion={location}
			>
				<Marker
					coordinate={{
						latitude: location.latitude,
						longitude: location.longitude,
					}}
					title="My Location"
					description="This is my current location"
				/>
			</MapView>
		</View>
	);
};

export default GoogleMap;
