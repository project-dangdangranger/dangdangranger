import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

const WalletProcessLayout = StyleSheet.create({
	processWrap: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: responsiveWidth(4),
		marginTop: 42,
	},
	iconCenterWrap: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
	iconWrap: {
		width: 42,
		height: 42,
		backgroundColor: "#3D6CC9",
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	iconWrap1: {
		width: 42,
		height: 42,
		backgroundColor: "#D9D9D9",
		borderRadius: 100,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	icon: {
		width: 20,
		height: 20,
	},
	iconText: {
		fontSize: 10,
		fontWeight: "500",
		color: "#2F3241",
		marginTop: 11,
	},
	inlineLine: {
		width: 80,
		height: 2,
		backgroundColor: "#D9D9D9",
		position: "relative",
		top: -10,
	},
});

export default WalletProcessLayout;
