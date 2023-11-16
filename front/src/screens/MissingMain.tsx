import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import CommonLayout from "../recycles/CommonLayout";
import Footer from "../recycles/Footer";
import ColorHeader from "../recycles/ColorHeader";
import MissingCount from "../components/MissingCount";

import MainLayout from "../styles/mainLayout";
import Carousel from "../components/Carousel";
import MissingTwoBtn from "../components/MissingTwoBtn";
import FooterBar from "../recycles/FooterBar";
import axios from "../utils/axios";
import { useFocusEffect } from "@react-navigation/native";

import MultiPicture from "../components/Carousel";

const MissingMain = () => {
	const [missingTogether, setMissingTogether] = useState(0);
	const [missingDog, setMissingDog] = useState(0);

	const [imgList, setImgList] = useState([]);
	useFocusEffect(
		React.useCallback(() => {
			axios.get("/missing/recent_missing_images").then((res) => {
				setImgList(res.data.data);
			});

			axios
				.get("/finddog/participants_count")
				.then((res) => {
					console.log(
						"현재 실종견 찾기 참여자수 : ",
						res.data.data.participantsCount,
					);
					setMissingTogether(res.data.data.participantsCount);
				})
				.catch((err) => {
					console.log("카운팅 에러!! :", err);
				});

			axios
				.get("/missing/count")
				.then((res) => {
					setMissingDog(res.data.data);
				})
				.catch((err) => {
					console.log("카운팅 에러!! :", err);
				});
		}, []),
	);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="실종" />
				<View style={MainLayout.walkMainWrap}>
					<MissingCount
						missingTogether={missingTogether}
						missingDog={missingDog}
					/>
					<MultiPicture imgList={imgList} />
				</View>
				<MissingTwoBtn />
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default MissingMain;
