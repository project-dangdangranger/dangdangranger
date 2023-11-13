import { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";

import FooterBar from "../recycles/FooterBar";
import CustomText from "../recycles/CustomText";
import Carousel from "../components/Carousel";
import MissingImg from "../../assets/images/profileImg.png";
import MissingItem from "../recycles/MissingItem";

const MissingFind = ({ navigation }: any) => {
	const data = [
		{
			dogNo: "0",
			dogName: "윤둥이",
			dogBreed: "폼피트",
			dogSex: "M",
			dogTokenId: "123",
			dogImg: MissingImg,
		},
		{
			dogNo: "0",
			dogName: "방방이",
			dogBreed: "말티즈",
			dogSex: "F",
			dogTokenId: "123",
			dogImg: MissingImg,
		},
	];

	return (
		<>
			<CommonLayout>
				<ColorHeader title="실종견 찾기" />
				<CustomText
					mainText="실종된 강아지 찾기에"
					emphasizedText="도움"
					emphasizedColor="#3E6DCA"
					finalText="을 주세요"
				/>
				{/* <Carousel></Carousel> */}
				<View style={styles.dogcontainer}>
					{data.map((item, index) => {
						return (
							<MissingItem key={index} item={item} navigation={navigation} />
						);
					})}
				</View>
				<TouchableOpacity onPress={() => navigation.navigate("FindTogether")}>
					<Text>지도가 나올 지도?</Text>
				</TouchableOpacity>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default MissingFind;

const styles = StyleSheet.create({
	imgcontainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(3),
	},
	imgRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: responsiveWidth(70),
	},
	BadgeImg: {
		height: 80,
		width: 60,
	},
	viewcontainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(0),
	},
	viewtext: {
		marginVertical: responsiveHeight(1),
		fontSize: 12,
		fontWeight: "bold",
	},
	dogcontainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: responsiveHeight(3),
	},
});
