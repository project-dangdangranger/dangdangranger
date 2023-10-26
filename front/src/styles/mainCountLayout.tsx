import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const SideMenuLayout = StyleSheet.create({
	MainContainer: {
		marginVertical: responsiveHeight(5),
		marginHorizontal: responsiveWidth(5),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	MaincountContainer: {
		height: responsiveHeight(15),
		borderRadius: 20,
		width: responsiveWidth(37),
		backgroundColor: "#FFF",
	},
});

export default SideMenuLayout;
