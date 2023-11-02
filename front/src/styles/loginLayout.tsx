import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	textregister: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		// marginLeft: responsiveWidth(15),
		marginTop: responsiveWidth(10),
	},
	textcontainer: {
		flex: 1,
		justifyContent: "center",
		// alignItems: "center",
		marginLeft: responsiveWidth(15),
		marginTop: responsiveWidth(10),
	},
	Text1: {
		fontSize: 30,
		fontWeight: "900",
		marginBottom: 10,
		color: "#0349A1",
	},
	Text2: {
		fontSize: 15,
	},
	containerImg: {
		justifyContent: "center",
		alignItems: "center",
	},
	Img1: {
		width: responsiveWidth(40),
		height: responsiveHeight(35),
	},
	LoginBtn: {
		borderWidth: 1,
		width: responsiveWidth(80),
		height: responsiveHeight(7),
		borderColor: "#B0B0B0",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		position: "relative",
	},
	BtnContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(5),
	},

	btnImg: {
		position: "absolute",
		left: responsiveWidth(5),
	},

	textBtn: {
		fontSize: 18,
		// marginLeft: responsiveWidth(5),
		color: "#2B2B2B",
		fontWeight: "bold",
		letterSpacing: 0.01,
	},
	bottomText: {
		marginHorizontal: responsiveWidth(10),
		marginTop: responsiveHeight(3),
		justifyContent: "center",
		alignItems: "center",
	},
	btnText: {
		fontSize: 13,
	},
	boldText: {
		fontWeight: "bold",
		color: "black",
		fontSize: 13,
	},
});

export default styles;
