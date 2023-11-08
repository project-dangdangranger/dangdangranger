import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Button,
	Dimensions,
	StyleSheet,
	PermissionsAndroid,
} from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { MAPBOX_ACCESSTOKEN } from "@env";
import Geolocation from "react-native-geolocation-service";

MapboxGL.setWellKnownTileServer("Mapbox");
MapboxGL.setAccessToken(MAPBOX_ACCESSTOKEN);

const Test = () => {
	useEffect(() => {
		MapboxGL.setTelemetryEnabled(false);
		requestLocationPermission();
	}, []);

	const requestLocationPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				// Permission granted, proceed with location retrieval
			} else {
				// Permission denied
			}
		} catch (err) {
			console.warn(err);
		}
	};

	return (
		<View style={styles.page}>
			<View style={styles.container}>
				<MapboxGL.MapView style={styles.map} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	page: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
	},
	container: {
		height: 300,
		width: 300,
		backgroundColor: "tomato",
	},
	map: {
		flex: 1,
	},
});

export default Test;
