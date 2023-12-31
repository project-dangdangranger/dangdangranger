import { StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const AlbumLayout = StyleSheet.create({
	profileWrap: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: responsiveWidth(4),
		position: "relative",
	},
	myNameTitle: {
		fontSize: 22,
		fontWeight: "600",
		color: "#5B5B5B",
		textAlign: "center",
	},
	changeImageWrap: {
		padding: 8,
		borderRadius: 50,
		backgroundColor: "#3E6DCA",
		position: "absolute",
		bottom: 0,
		right: responsiveWidth(35),
	},
	changeImageIcon: {},
	userPhoto: {
		position: "relative",
		width: 120,
		height: 120,
		borderRadius: 100,
		marginTop: 20,
	},
	photoItem: {
		width: responsiveWidth(32),
		height: responsiveWidth(32),
		marginHorizontal: responsiveWidth(0.5),
		marginVertical: responsiveWidth(0.5),
	},
	userContainer: {
		marginHorizontal: responsiveWidth(10),
		marginTop: responsiveHeight(2),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingRight: responsiveWidth(5),
		alignItems: "center",
	},
	userContainerText: {
		fontSize: 16,
		fontWeight: "900",
		color: "#000000",
		paddingBottom: 6,
	},
	userContainerText1: {
		fontSize: 16,
		fontWeight: "900",
		color: "#3E6DCA",
	},
	btnCSS1: {
		padding: 6,
		borderColor: "#3E6DCA",
		borderRadius: 20,
		borderWidth: 1,
		width: responsiveWidth(22),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},

	userContainerText2: {
		fontSize: 16,
		fontWeight: "600",
		color: "#797971",
		paddingBottom: 6,
		width: responsiveWidth(70),
		height: responsiveHeight(6),
	},
	userColcontainer: {
		display: "flex",
		flexDirection: "column",
	},
	DividSection: {
		marginVertical: responsiveHeight(1),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	userSectionDivid: {
		borderBottomColor: "red",
		borderBottomWidth: 2,
		width: responsiveWidth(90),
	},
});

export default AlbumLayout;
