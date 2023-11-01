import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const PatrolDiaryLayout = StyleSheet.create({
	container: {
		height: responsiveHeight(72),
		alignItems: "center",
	},

	headerWrap: {
		marginTop: responsiveHeight(1.5),
		width: responsiveWidth(88),
	},
	headerTextDesc: {
		fontWeight: "600",
	},
	headerTextTitle: {
		fontSize: 25,
		fontWeight: "900",
		color: "black",
	},
	headerRowWrap: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	radioWrap: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		// backgroundColor: "blue",
	},

	imgWrap: {
		position: "relative",
		borderRadius: 20,
	},
	img: {
		width: responsiveWidth(80),
		resizeMode: "stretch",
	},
	imgText: {
		position: "absolute",
		right: 0,
		marginVertical: responsiveHeight(1),
		marginHorizontal: responsiveWidth(1),
		paddingVertical: responsiveHeight(0.5),
		paddingHorizontal: responsiveWidth(1.5),
		borderRadius: 50,
		backgroundColor: "rgba(0, 0, 0, 0.2)",
		color: "white",
		fontSize: 15,
		fontWeight: "bold",
	},
	imgAddrText: {
		top: 0,
	},
	imgHitText: {
		bottom: 0,
	},

	debug: {
		borderWidth: 2,
		backgroundColor: "red",
	},
});

export default PatrolDiaryLayout;
