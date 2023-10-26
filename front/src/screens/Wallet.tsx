import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
// import GestureFlipView from "../components/GestureFlipView";
import CommonLayout from "../recycles/CommonLayout";
// import ProfileItem from "../components/ProfileItem";
// import NftProfile from "../components/NftProfile";

import WhiteHeader from "../recycles/WhiteHeader";
// import SubMain from "../components/SubMain";
// import SubMainImg from "../../assets/images/sub-main-bg.png";
// import rightArrowIcon from "../../assets/images/right-arrow.png";
import ProfileLayout from "../styles/profileLayout";
import TempImg from "../../assets/images/templogo.png";
import Footer from "../recycles/Footer";
import ColorHeader from "../recycles/ColorHeader";
import AlbumLayout from "../styles/albumLayout";
import TempProfileImg from "../../assets/images/dog1.jpg";
import WhitePenIcon from "../../assets/images/pen-icon.png";
import FourBtn from "../recycles/FourBtn";
import AbsoluteVar from "../recycles/FooterBar";
import MainLayout from "../styles/mainLayout";
import CustomButton from "../recycles/CustomBtn";
import NFTImg from "../../assets/images/NFTImg.png";

const Profile = ({ navigation }: any) => {
	const flipView = useRef<any>();
	const [dogList, setDogList] = useState<any>([]);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="주소 관리" />
				<View>
					<View style={MainLayout.walkMainWrap}>
						<Text style={MainLayout.walkMainTitle}>
							지갑이 없습니다.{"\n"}
							<Text style={MainLayout.walkBoldText}>지갑</Text>을 만들어주세요{" "}
							{"\n"}
						</Text>
					</View>
				</View>

				<View>
					<Image source={NFTImg} />
				</View>
				<CustomButton
					text="지갑 발급하기"
					onPress={() => navigation.navigate("MakeWallet1")}
				/>
				<Footer />
			</CommonLayout>
			<AbsoluteVar />
		</>
	);
};

export default Profile;
