import { StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const styles = StyleSheet.create({
	submainContainer: {
		marginTop: responsiveHeight(2),
		marginHorizontal: responsiveWidth(10),
	},
	banContainer: {
		paddingBottom: responsiveHeight(2),
		width: responsiveWidth(80),
		backgroundColor: "#FDE8E8",
		borderRadius: 20,
		borderColor: "#E30E0E",
		borderWidth: 2,
	},
	banMain: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	banMainCenter: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(2),
	},
	banMainText: {
		fontSize: 18,
		color: "#E30E0E",
		fontWeight: "bold",
	},
	banContent: {
		marginTop: responsiveHeight(1),
		width: responsiveWidth(70),
	},
	banContentText: {
		fontSize: 15,
		color: "#3B3F42",
	},
	activeText: {
		color: "#3D6CC9",
	},
	underline: {
		height: 2,
		backgroundColor: "#3D6CC9",
		width: "100%",
		marginTop: 5,
	},
	container: {
		justifyContent: "center",
		alignItems: "center",
		height: responsiveHeight(40),
	},
	KeyContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: responsiveHeight(4),
	},
	BtnWidth: {
		width: responsiveWidth(40),
		height: responsiveHeight(5),
		// backgroundColor: "#E30E0E",
		justifyContent: "center",
		alignItems: "center",
	},
	textKey: {
		fontSize: 18,
	},
	PKcode: {
		marginVertical: responsiveHeight(3),
	},
	textContainer: {
		height: responsiveHeight(30),
		// justifyContent: "center",
		alignItems: "center",
	},
	QRimage: {
		height: responsiveHeight(30),
	},
	textBorder: {
		width: responsiveWidth(80),
		height: responsiveHeight(20),
		borderWidth: 1,
		borderRadius: 20,
		borderColor: "#9D9D9D",
	},
	textMargin: {
		marginVertical: responsiveHeight(2),
		marginHorizontal: responsiveWidth(5),
	},
	text: {
		color: "black",
		fontSize: 16,
	},
});

export default styles;
