import { useEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
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
import MainLayout from "../styles/mainLayout";
import CustomButton from "../recycles/CustomBtn";
import NFTImg from "../../assets/images/NFTImg.png";
import CustomText from "../recycles/CustomText";
import { responsiveHeight } from "react-native-responsive-dimensions";

const Profile = ({ navigation }: any) => {
	const flipView = useRef<any>();
	const [dogList, setDogList] = useState<any>([]);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="주소 관리" />
				{/* <View>
					<View style={MainLayout.walkMainWrap}>
						<Text style={MainLayout.walkMainTitle}>
							지갑이 없습니다.{"\n"}
							<Text style={MainLayout.walkBoldText}>지갑</Text>을 만들어주세요{" "}
							{"\n"}
						</Text>
					</View>
				</View> */}

				<CustomText
					mainText="지갑이 없습니다."
					emphasizedText="지갑"
					emphasizedColor="#3E6DCA"
					finalText="을 만들어주세요"
				/>

				<View style={styles.imgcontainer}>
					<Image source={NFTImg} />
				</View>
				<CustomButton
					text="지갑 발급하기"
					onPress={() => navigation.navigate("MakeWallet1")}
				/>
			</CommonLayout>
			<AbsoluteVar />
		</>
	);
};

export default Profile;

const styles = StyleSheet.create({
	imgcontainer: {
		justifyContent: "center",
		alignItems: "center",
		marginVertical: responsiveHeight(12),
	},
});
