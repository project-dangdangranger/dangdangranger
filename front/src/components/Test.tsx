import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@rnmapbox/maps";
import { MAPBOX_ACCESSTOKEN } from "@env";

MapboxGL.setWellKnownTileServer("Mapbox");
MapboxGL.setAccessToken(MAPBOX_ACCESSTOKEN);

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

export default class Test extends Component {
	componentDidMount() {
		MapboxGL.setTelemetryEnabled(false);
	}

	render() {
		return (
			<View style={styles.page}>
				<View style={styles.container}>
					<MapboxGL.MapView style={styles.map} />
				</View>
			</View>
		);
	}
}
