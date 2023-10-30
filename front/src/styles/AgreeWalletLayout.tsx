import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const AgreeWalletLayout = StyleSheet.create({
	titleWrap: {
		marginTop: 30,
		paddingHorizontal: responsiveWidth(4),
	},
	mainTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#616166",
	},
	subTitle: {
		fontSize: 10,
		fontWeight: "500",
		color: "#B1B1B7",
		marginTop: 12,
		lineHeight: 16,
	},

	agreeWrap: {
		marginTop: 27,
		paddingHorizontal: responsiveWidth(4),
	},
	agreeTitle: {
		fontSize: 12,
		fontWeight: "700",
		color: "#616166",
	},
	agreeContentWrap: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		marginTop: 14,
	},
	agreeIcon: {
		width: 18,
		height: 18,
	},
	agreeText: {
		marginLeft: 8,
		fontSize: 10,
		fontWeight: "500",
		color: "#616166",
	},

	subTextWrap1: {
		paddingHorizontal: responsiveWidth(4),
		marginTop: 29,
	},
	subText1: {
		fontSize: 10,
		fontWeight: "500",
		color: "#B1B1B7",
	},
	subTextWrap2: {
		paddingHorizontal: responsiveWidth(4),
	},
	subText2: {
		fontSize: 10,
		fontWeight: "500",
		color: "#B1B1B7",
		marginTop: 24,
	},

	buttonWrap: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: responsiveWidth(4),
		marginVertical: 28,
	},
	widthWrap: {
		width: "48%",
		marginBottom: 30,
	},
	disAgreeButton: {
		width: "100%",
		height: 50,
		backgroundColor: "#E9ECF5",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	disAgreeButtonText: {
		fontSize: 16,
		fontWeight: "400",
		color: "#21242B",
	},
	agreeButton: {
		width: "100%",
		height: 50,
		backgroundColor: "#3D6CC9",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	agreeButtonText: {
		fontSize: 16,
		fontWeight: "700",
		color: "#FFFFFF",
	},
});

export default AgreeWalletLayout;
