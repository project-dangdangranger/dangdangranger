import { useEffect, useRef, useState } from "react";
import { Text, View, Image, Alert, TouchableOpacity } from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const GoogleMap = ({ navigation }: any) => {
	return (
		<>
			<View style={{ flex: 1 }}>
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
				<Marker
					coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
					title="this is a marker"
					description="this is a marker example"
				/>
			</View>
		</>
	);
};

export default GoogleMap;
