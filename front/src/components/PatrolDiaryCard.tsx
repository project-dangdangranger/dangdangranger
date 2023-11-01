import { Image, StyleSheet, Text, View } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

import locationIcon from "../../assets/images/location-pin-icon.png";

const PatrolDiaryCard = ({ imgSrc, patrolDiaryInfo }: any) => {
	return (
		<>
			<View style={style.cardWrap}>
				<View style={style.imgWrap}>
					<Image source={imgSrc} style={style.img} />
				</View>
				<View style={style.textWrap}>
					<View style={style.textLocationWrap}>
						<Image source={locationIcon} style={style.iconLocation} />
						<Text style={style.textLocation}>위치</Text>
					</View>
					<View style={style.textTitleWrap}>
						<Text style={style.textTitle}>순찰 제목</Text>
					</View>
					<View style={style.textRowWrap}>
						<Text>작성자</Text>
						<Text>조회수</Text>
						<Text>날짜</Text>
					</View>
				</View>
			</View>
		</>
	);
};

export default PatrolDiaryCard;

const style = StyleSheet.create({
	cardWrap: {
		marginHorizontal: responsiveWidth(2),
		width: responsiveWidth(40),
		height: responsiveHeight(30),
		borderRadius: 5,
		borderColor: "#D3D3D3",
		borderWidth: 1,
		alignItems: "center",
		//elevation: 1,
	},

	imgWrap: {},
	img: {
		width: responsiveWidth(39),
		height: responsiveHeight(20),
		resizeMode: "stretch",
	},

	textWrap: {
		paddingVertical: responsiveHeight(1),
		width: responsiveWidth(39),
		paddingHorizontal: responsiveWidth(1),
	},

	textLocationWrap: {
		//paddingBottom: responsiveHeight(0.5),
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center",
	},
	textLocation: {},
	iconLocation: {
		width: 15,
		height: 15,
	},

	textTitleWrap: {
		paddingBottom: responsiveHeight(0.5),
	},
	textTitle: {
		fontWeight: "900",
		fontSize: 20,
		color: "black",
	},

	textRowWrap: {
		flexDirection: "row",
		justifyContent: "space-between",
	},

	debug: {
		borderWidth: 2,
		backgroundColor: "red",
	},
});
