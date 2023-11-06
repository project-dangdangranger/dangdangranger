import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const PatrolDiaryWriteLayout = StyleSheet.create({
	container: {
		marginTop: -responsiveHeight(3),
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
		height: responsiveHeight(24),
	},

	formWrap: {
		height: responsiveHeight(50),
		width: responsiveWidth(88),
		marginTop: -responsiveHeight(1),
		alignItems: "center",
	},

	imageUploadWrap: {
		width: responsiveWidth(85),
		height: 110,
		borderWidth: 2,
		borderColor: "#E1E1E1",
		borderRadius: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 24,
	},

	formInput: {
		width: responsiveWidth(85),
		height: 36,
		borderWidth: 1,
		borderColor: "#9D9D9D",
		borderRadius: 2,
		marginTop: 7,
		padding: 6,
	},

	textAlign: {
		marginTop: responsiveHeight(1),
		textAlign: "left",
		width: responsiveWidth(85),
	},

	textDesc: {
		height: responsiveHeight(15),
		marginBottom: responsiveHeight(1.5),
	},

	debug: {
		borderWidth: 2,
		backgroundColor: "red",
	},
});

export default PatrolDiaryWriteLayout;
