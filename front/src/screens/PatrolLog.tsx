import { Image, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import LogMapImg from "../../assets/images/log-map-img.png";
import PatrolLogLayout from "../styles/patrolLogLayout";
import { responsiveWidth } from "react-native-responsive-dimensions";
import img from "../../assets/images/debug-dog.png";
import DetailBtn from "../components/DetailBtn";
import PatrolLogCarousel from "../recycles/PatrolLogCarousel";
import axios from "../utils/axios";

const PatrolLog = () => {
	const [logs, setLogs] = useState([]);

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

			setLogs(transformedLogs);
		} catch (error) {
			console.error("Error fetching logs:", error);
		}
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="내 순찰 기록" />
				<Image source={LogMapImg} style={PatrolLogLayout.imgWrap} />
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
