import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const PatrolLogLayout = StyleSheet.create({
	imgWrap: {
		height: responsiveHeight(50),
		width: responsiveWidth(100),
		resizeMode: "stretch",
	},
	textWrap: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: responsiveHeight(8),
	},
	textTitle: {
		fontSize: 30,
		fontWeight: "900",
		color: "black",
		marginHorizontal: responsiveWidth(5),
	},
	textDate: {
		fontSize: 15,
		color: "black",
		fontWeight: "700",
		marginHorizontal: responsiveWidth(5),
		paddingTop: responsiveHeight(1.5),
	},
	scrollWrap: {
		height: responsiveHeight(25),
		width: "100%",
	},
	cardWrap: {
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		elevation: 5,
		width: responsiveWidth(40),
		marginHorizontal: responsiveWidth(5),
		marginBottom: responsiveHeight(1),
	},

	cardImg: {
		position: "relative",
		height: responsiveHeight(17),
		width: responsiveWidth(33),
		marginTop: responsiveHeight(1),
		borderRadius: 20,
		resizeMode: "stretch",
	},
	cardTextDate: {
		position: "relative",
		bottom: responsiveHeight(2.5),
		left: responsiveWidth(8),
		fontSize: 15,
		fontWeight: "900",
		backgroundColor: "rgba(255,255,255,0.5)",
		borderRadius: 20,
	},
});

export default PatrolLogLayout;
