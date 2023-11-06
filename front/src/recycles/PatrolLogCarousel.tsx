import {
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import DetailBtn from "../components/DetailBtn";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import React, { useState } from "react";

const PatrolLogCarousel = ({ logs }: any) => {
	const [selectedLogNo, setSelectedLogNo] = useState(null);

	const handleLogClick = (logNo) => {
		if (selectedLogNo === logNo) {
			setSelectedLogNo(null);
			return;
		}
		setSelectedLogNo(logNo);
		console.log(logNo);
	};

	return (
		<>
			<View style={style.scrollWrap}>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					{logs.map((log: any, index: any) => {
						return (
							<TouchableOpacity
								key={log.logNo}
								style={[
									style.cardWrap,
									selectedLogNo === log.logNo && style.logItemSelected,
								]}
								onPress={() => handleLogClick(log.logNo)}
							>
								<Image source={log.imgSrc} style={style.cardImg} />
								<Text style={style.cardTextDate}>{log.date}</Text>
								<DetailBtn />
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>
		</>
	);
};

export default PatrolLogCarousel;

const style = StyleSheet.create({
	scrollWrap: {
		height: responsiveHeight(24),
		width: "100%",
	},
	cardWrap: {
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		elevation: 5,
		width: responsiveWidth(37),
		marginHorizontal: responsiveWidth(5),
		marginBottom: responsiveHeight(1),
	},

	cardImg: {
		position: "relative",
		height: responsiveHeight(17),
		width: responsiveWidth(32),
		marginTop: responsiveHeight(1),
		borderRadius: 10,
		resizeMode: "stretch",
	},
	cardTextDate: {
		position: "relative",
		bottom: responsiveHeight(2.5),
		left: responsiveWidth(6),
		fontSize: 15,
		fontWeight: "900",
		backgroundColor: "rgba(255,255,255,0.5)",
		borderRadius: 10,
		paddingHorizontal: responsiveWidth(2),
	},
	logItemSelected: {
		// 선택된 로그 아이템에 적용할 스타일
		borderColor: "#70C8EE", // 예시: 파란색 테두리
		borderWidth: 2,
		backgroundColor: "#D3D3D3", // 예시: 회색 배경
	},
});
