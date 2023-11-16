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
		flexDirection: "column",
		width: responsiveWidth(50),
		// justifyContent: "center",
		// marginLeft: 20,
		alignItems: "center",
	},
	iconWrap: {
		width: 60,
		height: 60,
		marginTop: 15,
		marginBottom: 5,
	},
	textWrap: {
		fontSize: 16,
		fontWeight: "bold",
	},
	locationWrap: {
		backgroundColor: "#EFF4F1",
		borderRadius: 10,
		margin: 5,
		elevation: 5,
	},
	dateWrap: {
		backgroundColor: "#F4EDEB",
		elevation: 5,
		borderRadius: 10,
		margin: 5,
	},
	distanceWrap: {
		backgroundColor: "#F8F9F1",
		borderRadius: 10,
		margin: 5,
		elevation: 5,
	},
	timeWrap: {
		backgroundColor: "#EDF1F4",
		borderRadius: 10,
		margin: 5,
		elevation: 5,
	},

	debug: {
		borderWidth: 2,
		backgroundColor: "red",
	},
});

export default patrolLogDetailLayout;
