import { useEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
// import GestureFlipView from "../components/GestureFlipView";
import CommonLayout from "../recycles/CommonLayout";
import WhiteHeader from "../recycles/WhiteHeader";
import ProfileLayout from "../styles/profileLayout";
import TempImg from "../../assets/images/templogo.png";
import Footer from "../recycles/Footer";
import ColorHeader from "../recycles/ColorHeader";
import AlbumLayout from "../styles/albumLayout";
import TempProfileImg from "../../assets/images/dog1.jpg";
import WhitePenIcon from "../../assets/images/pen-icon.png";
import FourBtn from "../recycles/PetrolBtn";
import AbsoluteVar from "../recycles/FooterBar";
import CustomText from "../recycles/CustomText";
import PetrolImg from "../../assets/images/Patrol-license.png";
import { responsiveHeight } from "react-native-responsive-dimensions";
import CustomSubButton from "../recycles/CustomSubBtn";
import CustomBadge from "../components/CustomBadge";
import axios from "../utils/axios";
import DogList from "./DogList";

const Profile = ({ navigation }: any) => {
	const [dogList, setDogList] = useState([]);
	useEffect(() => {
		axios.get("/dog").then((res) => {
			// console.log("도그: ", res.data.data);
		});
	}, []);

	return (
		<>
			{dogList.length === 0 ? (
				<>
					<CommonLayout>
						<ColorHeader title="강아지 관리" />
						<View>
							<CustomText
								mainText="나의 반려견을"
								emphasizedText="방범대원"
								emphasizedColor="#70C8EE"
								finalText="으로 등록해보세요"
							/>
						</View>

						<View style={styles.imgcontainer}>
							<Image source={PetrolImg} />
						</View>

						<View>
							<CustomBadge text="우리 동네 1등 방범 대원" />
						</View>

						<CustomSubButton
							text={"NFT 반려대원 발급하기"}
							onPress={() => navigation.navigate("CreateDog")}
							color={"#70C8EE"}
						/>
					</CommonLayout>
					<AbsoluteVar />
				</>
			) : (
				<>
					<DogList />
				</>
			)}
		</>
	);
};

export default Profile;

const styles = StyleSheet.create({
	imgcontainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(5),
	},
});
