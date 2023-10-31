import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

import CommonLayout from "../recycles/CommonLayout";
import Footer from "../recycles/Footer";
import ColorHeader from "../recycles/ColorHeader";
import MissingCount from "../components/MissingCount";

import MainLayout from "../styles/mainLayout";
import Carousel from "../components/Carousel";
import MissingTwoBtn from "../components/MissingTwoBtn";
import FooterBar from "../recycles/FooterBar";

const MissingMain = () => {
	const [patrol, setPatrol] = useState(0);
	const [missing, setMissing] = useState(0);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="실종" />
				<View style={MainLayout.walkMainWrap}>
					<MissingCount patrol={patrol} missing={missing} />
					<Carousel />
				</View>
				<MissingTwoBtn />
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default MissingMain;
