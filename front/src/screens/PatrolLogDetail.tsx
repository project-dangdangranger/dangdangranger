import { Image, Text, View } from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import patrolLogDetailLayout from "../styles/patrolLogDetailLayout";
import LogMapImg from "../../assets/images/log-map-img.png";
import LocIconImg from "../../assets/images/location-icon.png";
import DateIconImg from "../../assets/images/date-icon.png";
import DistanceIconImg from "../../assets/images/distance-icon.png";
import TimeIconImg from "../../assets/images/time-icon.png";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "../utils/axios";
import clock from "../../assets/images/Clock.png";
import location from "../../assets/images/location.png";
import walk from "../../assets/images/walk.png";
import calander from "../../assets/images/calander.png";
const PatrolLogDetail = () => {
	const route = useRoute();
	const { logNo } = route.params;
	const [logDetail, setLogDetail] = useState(null);

	console.log("현재 페이지", logNo);

	useEffect(() => {
		getLogDetail();
	}, []);

	const getLogDetail = async () => {
		try {
			const response = await axios.get(`/log/${logNo}`);
			setLogDetail(response.data.data);
		} catch (error) {
			console.error("Error fetching logs:", error);
		}
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="순찰 상세 기록" />
				<View style={patrolLogDetailLayout.container}>
					<View style={patrolLogDetailLayout.imgWrap}>
						<Image
							source={{ uri: logDetail?.patrolLogImageUrl }}
							style={patrolLogDetailLayout.img}
						/>
					</View>
					<View style={patrolLogDetailLayout.detailContainer}>
						<View style={patrolLogDetailLayout.btnRowWrap}>
							<View
								style={[
									patrolLogDetailLayout.btnWrap,
									patrolLogDetailLayout.locationWrap,
								]}
							>
								{/* 이미지는 logDetail.patrolLogImageUrl */}
								<Image
									source={location}
									style={patrolLogDetailLayout.iconWrap}
								/>
								<Text style={patrolLogDetailLayout.textWrap}>
									{logDetail?.patrolLogAddress}
								</Text>
							</View>
							<View
								style={[
									patrolLogDetailLayout.btnWrap,
									patrolLogDetailLayout.dateWrap,
								]}
							>
								<Image
									source={calander}
									style={patrolLogDetailLayout.iconWrap}
								/>
								<Text style={patrolLogDetailLayout.textWrap}>
									{new Date(logDetail?.patrolLogDate).toLocaleDateString()}
								</Text>
							</View>
						</View>
						<View style={patrolLogDetailLayout.btnRowWrap}>
							<View
								style={[
									patrolLogDetailLayout.btnWrap,
									patrolLogDetailLayout.distanceWrap,
								]}
							>
								<Image source={walk} style={patrolLogDetailLayout.iconWrap} />
								<Text style={patrolLogDetailLayout.textWrap}>
									{logDetail?.patrolLogTotalDistance.toFixed(2)} Km
								</Text>
							</View>
							<View
								style={[
									patrolLogDetailLayout.btnWrap,
									patrolLogDetailLayout.timeWrap,
								]}
							>
								<Image source={clock} style={patrolLogDetailLayout.iconWrap} />
								<Text style={patrolLogDetailLayout.textWrap}>
									{logDetail?.patrolLogTotalTime} min
								</Text>
							</View>
						</View>
					</View>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolLogDetail;
