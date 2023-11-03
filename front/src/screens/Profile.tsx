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
import axios from "../utils/axios";

const Profile = ({ route, navigation }: any) => {
	const [ProfileData, setProfileData] = useState<any>([]);
	useEffect(() => {
		if (route.params?.updated) {
			// 파라미터가 전달되었다면 여기서 데이터를 다시 가져오거나 로직을 처리합니다.
			axios.get("/user").then((data) => {
				setProfileData(data.data.data);
			});
		}
	}, [route.params]);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="나의 프로필" />
				<View>
					<View style={AlbumLayout.profileWrap}>
						<Image
							source={{ uri: ProfileData.userProfileImg }}
							// source={TempProfileImg}
							style={AlbumLayout.userPhoto}
						/>
					</View>
					<View style={AlbumLayout.userColcontainer}>
						<View style={AlbumLayout.userContainer}>
							<Text style={AlbumLayout.userContainerText}>
								{ProfileData.userName} 님
							</Text>
							<TouchableOpacity style={AlbumLayout.btnCSS1}>
								<Text style={AlbumLayout.userContainerText1}>정보 검색</Text>
							</TouchableOpacity>
						</View>
						<View style={AlbumLayout.userContainer}>
							<Text style={AlbumLayout.userContainerText2}>
								{ProfileData.userAddress}
							</Text>
						</View>
						<View style={AlbumLayout.DividSection}>
							<View style={AlbumLayout.userSectionDivid}></View>
						</View>
					</View>
				</View>
				<FourBtn />
			</CommonLayout>
			<AbsoluteVar />
		</>
	);
};

export default Profile;
