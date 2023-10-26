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

const Profile = ({ navigation }: any) => {
	const flipView = useRef<any>();
	const [dogList, setDogList] = useState<any>([]);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="나의 프로필" />
				<View>
					<View style={AlbumLayout.profileWrap}>
						<Image
							// source={{ uri: myProfileImg }}
							source={TempProfileImg}
							style={AlbumLayout.userPhoto}
						/>
						<TouchableOpacity
							activeOpacity={0.7}
							style={AlbumLayout.changeImageWrap}
						>
							<View>
								<Image
									source={WhitePenIcon}
									style={AlbumLayout.changeImageIcon}
								/>
							</View>
						</TouchableOpacity>
					</View>
					<View style={AlbumLayout.userColcontainer}>
						<View style={AlbumLayout.userContainer}>
							<Text style={AlbumLayout.userContainerText}>
								"{"사용자의 닉네임"}" 님,
							</Text>
							<TouchableOpacity style={AlbumLayout.btnCSS1}>
								<Text style={AlbumLayout.userContainerText1}>정보 검색</Text>
							</TouchableOpacity>
						</View>
						<View style={AlbumLayout.userContainer}>
							<Text style={AlbumLayout.userContainerText2}>
								width: responsiveWidth(70), height: responsiveHeight(6), 최대
								30글자
							</Text>
						</View>
						<View style={AlbumLayout.DividSection}>
							<View style={AlbumLayout.userSectionDivid}></View>
						</View>
					</View>
				</View>
				<FourBtn />
				<Footer />
			</CommonLayout>
			<AbsoluteVar />
		</>
	);
};

export default Profile;
