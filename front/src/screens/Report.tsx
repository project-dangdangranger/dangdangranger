import { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import GestureFlipView from "../components/GestureFlipView";
import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import AbsoluteVar from "../recycles/FooterBar";
import CustomText from "../recycles/CustomText";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomSubButton from "../recycles/CustomSubBtn";
import Badges from "../constants/Badges";
import ProfileImg from "../../assets/images/profileImg.png";
import DogItem from "../recycles/DogItem";
import Report1 from "../../assets/images/Report1.png";
import Report2 from "../../assets/images/Report2.png";

const Profile = ({ navigation }: any) => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="신고하기" />
				<View>
					<CustomText
						mainText="반려견 대원들에게"
						emphasizedText="SOS"
						emphasizedColor="#FF6A6A"
						finalText="를 요청해보세요"
					/>
				</View>

				<View style={styles.imgContainer}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("CreateMissingDog");
						}}
					>
						<Image source={Report1} style={styles.img} />
						<View style={styles.imgTextContainer}>
							<View style={styles.textcCenterCntainer}>
								<Text style={styles.imgText}>유기견을 발견하셨나요?</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>

				<View style={styles.imgContainer}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("CreateMissingMyDog");
						}}
					>
						<Image source={Report2} style={styles.img} />
						<View style={styles.imgTextContainer}>
							<View style={styles.textcCenterCntainer}>
								<Text style={styles.imgText}>반려견을 잃어버리셨나요?</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			</CommonLayout>
			<AbsoluteVar />
		</>
	);
};

export default Profile;

const styles = StyleSheet.create({
	imgContainer: {
		justifyContent: "center",
		alignItems: "center",
		// width: responsiveWidth(84),
		margin: responsiveHeight(4),
		position: "relative",
	},
	img: {
		width: responsiveWidth(75),
		borderRadius: 25,
	},

	imgTextContainer: {
		position: "absolute",
		bottom: 0,
	},
	textcCenterCntainer: {
		alignItems: "center",
		justifyContent: "center",
		width: responsiveWidth(75),
		backgroundColor: "rgba(0,0,0,0.6)",
		padding: responsiveWidth(3),
		borderRadius: 25,
	},
	imgText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#FFFFFF",
	},
});
