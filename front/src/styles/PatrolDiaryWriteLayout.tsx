import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const PatrolDiaryWriteLayout = StyleSheet.create({
	container: {
		height: responsiveHeight(84),
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
		color: "#3D6CC9",
	},

	logWrap: {
		height: responsiveHeight(22),
	},

	formWrap: {
		height: responsiveHeight(50),
	},

	debug: {
		borderWidth: 2,
		backgroundColor: "red",
	},
});

export default PatrolDiaryWriteLayout;
