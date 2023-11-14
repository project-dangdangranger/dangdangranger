import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const SideMenuLayout = StyleSheet.create({
	sideMenuWrap: {
		width: responsiveWidth(70),
		height: responsiveHeight(100),
		position: "absolute",
		top: 0,
		left: 0,
		backgroundColor: "#FFFFFF",
		zIndex: 999,
		borderRadius: 10,
	},
	sideMenuHeader: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: responsiveWidth(4),
		paddingVertical: responsiveHeight(4),
	},
	sideMenuLogo: {
		fontSize: 24,
		fontWeight: "900",
		color: "#3E6DCA",
	},

	navWrap: {
		paddingHorizontal: responsiveWidth(4),
	},
	navTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#000000",
	},
	boldNavTitle: {
		color: "#3E6DCA",
	},
	navDesc: {
		fontSize: 12,
		fontWeight: "400",
		color: "#BBBBBB",
	},

	navFlex: {
		display: "flex",
		flexDirection: "row",
		flexWrap: "wrap",
	},

	authButtonWrap: {
		paddingHorizontal: responsiveWidth(4),
		marginTop: 34,
	},
	googleAuthButton: {
		width: responsiveWidth(62),
		height: 40,
		backgroundColor: "#EE8A72",
		borderRadius: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	googleAuthButtonText: {
		fontSize: 14,
		fontWeight: "700",
		color: "#FFFFFF",
	},
	moveMypageButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 4,
	},
	moveMypageButtonText: {
		fontSize: 12,
		fontWeight: "500",
		color: "#3E6DCA",
		marginBottom: responsiveHeight(4),
	},

	container: {
		// justifyContent: "center",
		alignItems: "center",
		marginBottom: responsiveHeight(5),
	},
	button: {
		width: responsiveWidth(65),
		// backgroundColor: "#EE8A72",
		height: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	btn: { backgroundColor: "#3E6DCA", borderRadius: 10 },
	text: {
		fontSize: 15,
		fontWeight: "900",
		color: "#FFFFFF",
	},
	closeImg: {
		resizeMode: "contain",
		transform: [{ scale: 1.7 }],
	},
});

export default SideMenuLayout;
