import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const PatrolDiaryWriteLayout = StyleSheet.create({
	container: {
		marginTop: responsiveHeight(2),
		// height: responsiveHeight(84),
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

	theeimgcontainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	threeimg: {
		borderRadius: 10,
		height: 100,
		width: 100,
		marginRight: 10,
	},
	deleteContainer: {
		paddingHorizontal: 5,
		paddingVertical: 5,
		borderRadius: 10,
		backgroundColor: "white",
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10,
	},
	deleteText: {
		fontSize: 15,
	},
	dateInput: {
		width: responsiveWidth(85),
		borderWidth: 1,
		borderColor: "#9D9D9D",
		marginBottom: responsiveHeight(2),
		borderRadius: 2,
		justifyContent: "center",
		height: 36,
		// alignItems: "center",
		// flexDirection: "row",
	},
	dateImg: {
		width: 20,
		height: 20,
		marginRight: 10,
		position: "absolute",
		marginHorizontal: responsiveWidth(2),
	},
});

export default PatrolDiaryWriteLayout;
