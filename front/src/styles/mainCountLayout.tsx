import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const SideMenuLayout = StyleSheet.create({
	MainContainer: {
		marginVertical: responsiveHeight(5),
		marginHorizontal: responsiveWidth(4),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	MaincountContainer: {
		height: responsiveHeight(15),
		borderRadius: 20,
		width: responsiveWidth(37),
		backgroundColor: "#FFF",
		marginHorizontal: responsiveWidth(1),
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	CountContainer: {
		width: responsiveWidth(40),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: responsiveWidth(7),
		alignItems: "center",
	},
	CountText: {
		fontWeight: "600",
		fontSize: 20,
	},
	CountNumber: {
		fontWeight: "bold",
		fontSize: 60,
	},
	NumberPatrol: {
		color: "#616166",
	},
	NumberMissing: {
		color: "#FF6524",
	},
});

export default SideMenuLayout;
