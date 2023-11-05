import { StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const PatrolReportDetailLayout = StyleSheet.create({
	mainContainer: {
		backgroundColor: "#fff",
		// marginHorizontal: responsiveWidth(10),
	},
	img: {
		width: responsiveWidth(100),
		height: responsiveWidth(60),
		// borderRadius: 15,
		// marginTop: responsiveHeight(2),
	},
	contentContainer: {
		backgroundColor: "#fff",
		width: responsiveWidth(100),
		height: responsiveHeight(9),
		borderRadius: 25,
		bottom: responsiveHeight(5),
	},
	mainTextContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	mainText: {
		height: responsiveHeight(7),
		marginTop: responsiveHeight(4),
		fontSize: 30,
		fontFamily: "NotoSansKR-Bold",
		fontWeight: "bold",
		borderBottomColor: "#E8E8E8",
		borderBottomWidth: 2,
		textAlign: "center",
		paddingBottom: responsiveHeight(2),
		width: responsiveWidth(80),
	},
	userContainer: {
		marginTop: responsiveHeight(1),
		height: responsiveHeight(10),
		bottom: responsiveHeight(3),
		marginHorizontal: responsiveWidth(5),
		flexDirection: "row",
		// justifyContent: "space-between",
	},
	userContainerImg: {
		width: responsiveWidth(20),
		alignItems: "center",
		justifyContent: "center",
	},
	userImg: {
		height: responsiveHeight(10),
		width: responsiveWidth(20),
		borderRadius: 100,
	},
	userTextCol: {
		flexDirection: "column",
		marginLeft: responsiveWidth(5),
		// backgroundColor: "blue",
		justifyContent: "space-between",
	},
	chatImg: {
		width: responsiveWidth(5),
		height: responsiveHeight(2),
	},
	chatcontainer: {},
	hitImg: {
		width: responsiveWidth(6),
		height: responsiveHeight(2),
	},
	hitcontainer: {
		marginLeft: responsiveWidth(2),
	},
	rowContainer: {
		marginTop: responsiveHeight(1),
		flexDirection: "row",
		alignItems: "baseline",
		width: responsiveWidth(40),
	},
	chatText: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	datacontainer: {
		marginTop: responsiveHeight(1),
	},
	usernameText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	patrollication: {},
	patrollocationText: {
		fontSize: 18,
		fontWeight: "bold",
	},
	contentcontainer: {
		marginHorizontal: responsiveWidth(5),
		flexDirection: "row",
	},
	contenttext: {
		fontSize: 18,
		// fontWeight: "bold",
	},
	contentText: {
		// backgroundColor: "#E8E8E8",
		width: responsiveWidth(80),
		height: responsiveHeight(20),
	},
	editContainer: {
		// backgroundColor: "red",
	},
	threedot: {
		height: responsiveHeight(4),
		width: responsiveWidth(4),
	},
	modalContainer: {
		flex: 1,
		// backgroundColor: "rgba(0,0,0,0.5)",
	},
	modalItem: {
		height: responsiveHeight(8),
		justifyContent: "center",
		alignItems: "center",
		// width: responsiveWidth(100),
	},
	modalView: {
		width: responsiveWidth(40),
		marginHorizontal: responsiveWidth(5),
		height: responsiveHeight(8),
		backgroundColor: "white",
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		top: responsiveHeight(63),
		left: responsiveWidth(45),
	},
	commentcontainer: {
		backgroundColor: "#F7F8FC",
		paddingTop: responsiveHeight(2),
	},
	commentMainContainer: {
		marginHorizontal: responsiveWidth(5),
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	commentText: { fontSize: 25, fontWeight: "bold", color: "#000" },
	commentCount: {
		fontSize: 25,
		fontWeight: "bold",
		color: "#3D6CC9",
		marginLeft: 10,
	},
	commentwrite: {
		borderWidth: 2,
		borderColor: "#3D6CC9",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderRadius: 10,
	},
	commentwriteText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#3D6CC9",
	},
	commentList: {
		marginTop: responsiveHeight(2),
		marginHorizontal: responsiveWidth(5),
	},
	commentDetail: {
		marginVertical: responsiveHeight(1),
		backgroundColor: "blue",
		width: responsiveWidth(90),
		height: responsiveHeight(10),
		borderRadius: 10,
	},
});

export default PatrolReportDetailLayout;
