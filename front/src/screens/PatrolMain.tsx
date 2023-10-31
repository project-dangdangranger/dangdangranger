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
import FourBtn from "../recycles/PetrolBtn";
import AbsoluteBar from "../recycles/FooterBar";
import Carousel from "../components/Carousel";

const PatrolMain = () => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="순찰" />
				<View>
					<View style={AlbumLayout.profileWrap}>
						<Carousel></Carousel>
					</View>
				</View>
				<FourBtn />
				<Footer />
			</CommonLayout>
			<AbsoluteBar />
		</>
	);
};

export default PatrolMain;
