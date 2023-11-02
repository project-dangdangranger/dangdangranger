import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const patrolLogDetailLayout = StyleSheet.create({
	container: {
		height: responsiveHeight(84),
	},

	imgWrap: {},
	img: {
		height: responsiveHeight(50),
		width: responsiveWidth(100),
		resizeMode: "stretch",
	},

	detailContainer: {
		height: responsiveHeight(34),
	},
	btnRowWrap: {
		flex: 1,
		flexDirection: "row",
		height: responsiveHeight(17),
	},
	btnWrap: {
		flex: 1,
		flexDirection: "row",
		width: responsiveWidth(50),
		justifyContent: "center",
		alignItems: "center",
	},
	iconWrap: {
		width: 50,
		height: 50,
	},
	textWrap: {
		fontSize: 20,
		fontWeight: "bold",
	},
	locationWrap: {
		borderRightWidth: 1,
		borderBottomWidth: 1,
	},
	dateWrap: {
		borderLeftWidth: 1,
		borderBottomWidth: 1,
	},
	distanceWrap: {
		borderRightWidth: 1,
		borderTopWidth: 1,
	},
	timeWrap: {
		borderLeftWidth: 1,
		borderTopWidth: 1,
	},

	debug: {
		borderWidth: 2,
		backgroundColor: "red",
	},
});

export default patrolLogDetailLayout;
