import React, { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Platform,
	Touchable,
	TouchableOpacity,
} from "react-native";
// import GestureFlipView from "../components/GestureFlipView";
import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import AbsoluteVar from "../recycles/FooterBar";
import CustomText from "../recycles/CustomText";
import PetrolImg from "../../assets/images/Patrol-license.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomSubButton from "../recycles/CustomSubBtn";
import Badge1 from "../../assets/images/badge-01.png";
import Badge2 from "../../assets/images/badge-02.png";
import Badge3 from "../../assets/images/badge-03.png";
import Badges from "../constants/Badges";
import CustomTwinButton from "../recycles/CustomTwinBtn";
import ProfileImg from "../../assets/images/profileImg.png";
import DogItem from "../recycles/DogItem";
import { useNavigation } from "@react-navigation/native";
import axios from "../utils/axios";
import { useFocusEffect } from "@react-navigation/native";

const Profile = () => {
	const navigation = useNavigation();
	const [dogList, setDogList] = useState([]);

	useFocusEffect(
		React.useCallback(() => {
			axios.get("/dog").then((res) => {
				console.log("도그: ", res.data.data);
				setDogList(res.data.data);
			});
		}, []),
	);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="강아지 관리" />
				<View>
					<CustomText
						mainText="반려견 대원의"
						emphasizedText="소중한 정보"
						emphasizedColor="#70C8EE"
						finalText="를 확인해보세요"
					/>
				</View>

				<View style={styles.imgcontainer}>
					<View style={styles.imgRow}>
						<View style={styles.viewcontainer}>
							<Badges type="badge1" />
							<View>
								<Text style={styles.viewtext}>hello</Text>
							</View>
						</View>
						<View style={styles.viewcontainer}>
							<Badges type="badge2" />
							<View>
								<Text style={styles.viewtext}>hello</Text>
							</View>
						</View>
						<View style={styles.viewcontainer}>
							<Badges type="badge10" />
							<View>
								<Text style={styles.viewtext}>hello</Text>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.dogcontainer}>
					{dogList?.map((item, index) => {
						return <DogItem key={index} item={item} navigation={navigation} />;
					})}
				</View>
				<CustomSubButton
					text={"NFT 발급하기"}
					onPress={() => navigation.navigate("CreateDog")}
					color={"#70C8EE"}
				/>
			</CommonLayout>
			<AbsoluteVar />
		</>
	);
};

export default Profile;

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
