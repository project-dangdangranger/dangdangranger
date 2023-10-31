import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const PatrolDiaryLayout = StyleSheet.create({
	container: {
		height: responsiveHeight(42),
		alignItems: "center",
	},

	titleWrap: {
		marginVertical: responsiveHeight(2),
		width: responsiveWidth(80),
	},
	titleText: {
		fontSize: 25,
		fontWeight: "bold",
		color: "black",
	},
	titleTextColored: {
		color: "#70C8EE",
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
