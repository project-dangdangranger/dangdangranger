import { useNavigation } from "@react-navigation/native";

import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import FourBtn from "../recycles/PetrolFourBtn";
import AbsoluteBar from "../recycles/FooterBar";
import Carousel from "../recycles/MultiPicture";
import ManualItem from "../recycles/ManualItem";
import { useState } from "react";
import { View, Text } from "react-native";
import ManualSub1 from "../components/Manual/ManualSub1";
import ManualSub2 from "../components/Manual/ManualSub2";
import ManualSub3 from "../components/Manual/ManualSub3";
import ManualSub4 from "../components/Manual/ManualSub4";
import ManualSub5 from "../components/Manual/ManualSub5";
import ManualSub6 from "../components/Manual/ManualSub6";
import ManualSub7 from "../components/Manual/ManualSub7";
import ManualSub8 from "../components/Manual/ManualSub8";
import ManualSub9 from "../components/Manual/ManualSub9";
import ManualSub10 from "../components/Manual/ManualSub10";

const ManualMain = () => {
	const navigation = useNavigation();
	const [isVisible, setIsVisible] = useState(false);
	// 각 ManualItem에 대한 상태를 관리하는 객체를 생성합니다.
	const [visibleItems, setVisibleItems] = useState({});

	// 이 함수는 특정 항목의 표시 상태를 토글합니다.
	const toggleVisibility = (item: any) => {
		setVisibleItems((prev: any) => ({
			// 모든 항목을 비활성화합니다.
			...Object.keys(prev).reduce((acc, key) => ({ ...acc, [key]: false }), {}),
			// 클릭된 항목만 토글합니다.
			[item]: !prev[item],
		}));
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="사용자 가이드" />

				<ManualItem text="NFT란?" onPress={() => toggleVisibility("nft")} />
				{visibleItems.nft && <ManualSub1 />}

				<ManualItem
					text="순찰방범대는 무슨일을 하나요?"
					onPress={() => toggleVisibility("patroldo")}
				/>
				{visibleItems.patroldo && <ManualSub2 />}

				<ManualItem
					text="순찰방범대원증은 어떻게 발급하나요?"
					onPress={() => toggleVisibility("howmakepatrol")}
				/>
				{visibleItems.howmakepatrol && <ManualSub3 />}

				<ManualItem
					text="대원증(NFT)은 영구적으로 저장되나요?"
					onPress={() => toggleVisibility("foreverpatrol")}
				/>
				{visibleItems.foreverpatrol && <ManualSub4 />}

				<ManualItem
					text="순찰방범대원증을 갱신할 수 있나요?"
					onPress={() => toggleVisibility("repatrol")}
				/>
				{visibleItems.repatrol && <ManualSub5 />}

				<ManualItem
					text="비문인식이 뭔가요?"
					onPress={() => toggleVisibility("dognose")}
				/>
				{visibleItems.dognose && <ManualSub6 />}

				<ManualItem
					text="디지털 지갑이란?"
					onPress={() => toggleVisibility("hdwallet")}
				/>
				{visibleItems.hdwallet && <ManualSub7 />}

				<ManualItem
					text="디지털 지갑의 개인키 확인하는 방법"
					onPress={() => toggleVisibility("findprivatekey")}
				/>
				{visibleItems.findprivatekey && <ManualSub8 />}

				<ManualItem
					text="NFT를 메타마스크에서 확인할 수 있나요?"
					onPress={() => toggleVisibility("metamask")}
				/>
				{visibleItems.metamask && <ManualSub9 />}

				<ManualItem
					text="폴리곤 네트워크가 무엇인가요?"
					onPress={() => toggleVisibility("whatpolygon")}
				/>
				{visibleItems.whatpolygon && <ManualSub10 />}

				{/* <ManualItem
					text="NFT란?"
					onPress={() => setIsVisible(!isVisible)}
				></ManualItem>
				{isVisible && <ManualSub1 />}

				<ManualItem
					text="순찰방범대는 무슨일을 하나요?"
					onPress={() => setIsVisible(!isVisible)}
				></ManualItem>
				{isVisible && <ManualSub1 />} */}
			</CommonLayout>
			<AbsoluteBar />
		</>
	);
};

export default ManualMain;
