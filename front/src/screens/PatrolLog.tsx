import { Image, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import defaultLogImg from "../../assets/images/patrol-log-default-img.png";
import PatrolLogLayout from "../styles/patrolLogLayout";
import { responsiveWidth } from "react-native-responsive-dimensions";
import img from "../../assets/images/debug-dog.png";
import DetailBtn from "../components/DetailBtn";
import PatrolLogCarousel from "../recycles/PatrolLogCarousel";
import axios from "../utils/axios";
import CustomBtn from "../recycles/CustomBtn";
import { useNavigation } from "@react-navigation/native";

const PatrolLog = () => {
	const navigation = useNavigation();
	const [logs, setLogs] = useState([]);
	const [firstImg, setFirstImg] = useState(defaultLogImg);

	useEffect(() => {
		getLogs();
	}, []);

	const getLogs = async () => {
		try {
			const response = await axios.get("/log");
			console.log(response.data);

			const transformedLogs = response.data.data.map((log) => ({
				logNo: log.patrolLogNo,
				imgSrc: { uri: log.patrolLogImageUrl },
				date: log.patrolLogDate.split("T")[0],
			}));

			setFirstImg(transformedLogs[0].imgSrc);
			setLogs(transformedLogs);
		} catch (error) {
			console.error("Error fetching logs:", error);
		}
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="내 순찰 기록" />
				<Image source={firstImg} style={PatrolLogLayout.imgWrap} />
				<CustomBtn
					text={"순찰하러 가기"}
					onPress={() => navigation.navigate("PatrolGo")}
				></CustomBtn>
				<View style={PatrolLogLayout.textWrap}>
					<Text style={PatrolLogLayout.textTitle}>내 순찰 기록</Text>
				</View>
				<PatrolLogCarousel logs={logs} />
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolLog;
