import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Modal,
	TextInput,
} from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import ColorHeader from "../recycles/ColorHeader";
import axios from "../utils/axios";
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/PatrolReportDetailLayout";
import dotIconImg from "../../assets/images/3-dot-icon.png";
import PatrolDiaryLayout from "../styles/patrolDiaryLayout";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import MultiPicture from "../recycles/MultiPicture";
import CustomButton from "../recycles/CustomBtn";

const PatrolReportDetail = ({ route }: any) => {
	// console.log("라우트!!!!!!", route.params);
	const { navigate } = useNavigation();
	const { missingNo, imageUrl } = route.params;

	console.log("헬로우", imageUrl);

	const [missingData, setMissingData] = useState({});
	const [elapsedTime, setElapsedTime] = useState("00일 00시간 00분 00초");

	useEffect(() => {
		const startDate = new Date(missingData.missingDate);
		const interval = setInterval(() => {
			const currentTime = Date.now();
			const elapsedMs = currentTime - startDate.getTime();

			const seconds = Math.floor((elapsedMs / 1000) % 60);
			const minutes = Math.floor((elapsedMs / (1000 * 60)) % 60);
			const hours = Math.floor((elapsedMs / (1000 * 60 * 60)) % 24);
			const days = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));

			const formattedTime = `${days.toString().padStart(2, "0")}일 ${hours
				.toString()
				.padStart(2, "0")}시간 ${minutes
				.toString()
				.padStart(2, "0")}분 ${seconds.toString().padStart(2, "0")}초`;
			setElapsedTime(formattedTime);

			// console.log(formattedTime);
		}, 1000);

		return () => clearInterval(interval);
	}, [missingData.missingDate]);

	useFocusEffect(
		React.useCallback(() => {
			axios
				.get(`/missing/${missingNo}`)
				.then((res) => {
					console.log("받았냐고", res.data.data);
					setMissingData(res.data.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}, []),
	);

	const [data, setData] = useState({});
	const commentSubmit = () => {
		// axios
		// 	.post("/patrolcomment", {
		// 		patrolNo: patrolNo,
		// 		userNo: userData?.userNo,
		// 		patrolCommentContent: commentsubmittext,
		// 	})
		// 	.then((res) => {
		// 		setDataVersion((prevVersion) => prevVersion + 1);
		// 		setCommentSubmitText("");
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title={"신고견 상세"} />

				<View
					style={{ width: responsiveWidth(100), height: responsiveHeight(30) }}
				>
					<MultiPicture
						imgList={[imageUrl]}
						location={route.params.missingAddress}
					/>
				</View>

				<View style={styles.mainContainer}>
					<View style={styles.contentContainer}>
						<View style={styles.mainTextContainer}>
							<Text style={styles.mainText}>{missingData?.missingTitle}</Text>
						</View>
					</View>

					<View style={styles.dateIng}>
						<Text style={styles.missingDateText3}>{elapsedTime} 경과</Text>
					</View>

					<View style={styles.addresscontainer}>
						<View style={styles.missingaddress}>
							<Text style={styles.missingDateText2}>실종 장소</Text>
							<Text>{missingData?.missingAddress?.slice(0, 20)}</Text>
						</View>
						<View style={styles.missingtitle}>
							<Text style={styles.missingDateText1}>실종 시간</Text>
							<Text style={styles.missingDateText}>
								{missingData?.missingDate?.slice(0, 10)}
							</Text>
						</View>
					</View>

					<View style={styles.contentcontainer}>
						<View style={styles.contentText}>
							<Text style={styles.contenttext}>
								{missingData?.missingContent}
							</Text>
						</View>
						<View style={styles.editContainer}></View>
					</View>

					<CustomButton
						text={"실종견 신고하기"}
						onPress={() => {
							console.log("실종견??!!");
							// navigate("PatrolReport")
						}}
					/>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolReportDetail;
