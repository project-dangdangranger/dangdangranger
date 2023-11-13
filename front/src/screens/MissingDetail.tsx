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
	console.log("라우트!!!!!!", route.params);
	const { navigate } = useNavigation();

	const [missingData, setMissingData] = useState({});

	useFocusEffect(
		React.useCallback(() => {
			axios
				.get(`/missing/${route.params.missingNo}`)
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
	const { patrolNo } = route.params;
	const [userData, setUserData] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
	const threedotRef = useRef(null);
	const handlePressThreedot = () => {
		threedotRef.current.measure((fx, fy, width, height, px, py) => {
			px = responsiveWidth(45);
			setModalPosition({ top: py + height + 10, left: px });
			setModalVisible(true);
		});
	};

	const [dataVersion, setDataVersion] = useState(0);
	const [commentList, setCommentList] = useState(data?.patrolComments);
	const [commentsubmittext, setCommentSubmitText] = useState("");
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

	useEffect(() => {
		// const fetchData = async () => {
		// 	try {
		// 		const response = await axios.get(`/patrol/${patrolNo}`);
		// 		if (response.data.message === "순찰일지 상세조회 완료") {
		// 			setData(response.data.data);
		// 			console.log(response.data.data);
		// 		}
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// };
		// fetchData();
	}, [dataVersion]);

	useEffect(() => {
		// axios
		// 	.get(`/patrol/${patrolNo}`)
		// 	.then((res) => {
		// 		if (res.data.message === "순찰일지 상세조회 완료") {
		// 			setData(res.data.data);
		// 			console.log(res.data.data);
		// 		}
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}, []);

	useEffect(() => {
		// axios
		// 	.get("/user")
		// 	.then((res) => {
		// 		setUserData(res.data.data);
		// 		// console.log(res.data.data);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	}, []);

	if (missingData) {
		console.log(111111111111);
		console.log("missingData:", missingData);
		console.log(2222222222222);
	}

	return (
		<>
			<CommonLayout>
				<ColorHeader title={"신고견 상세"} />

				{/* <Image
					source={{ uri: data?.patrolFirstImg }}
					style={styles.img}
				></Image> */}

				<View
					style={{ width: responsiveWidth(100), height: responsiveHeight(30) }}
				>
					<MultiPicture
						imgList={[route.params.thumbnailUrl]}
						location={route.params.missingAddress}
					/>
				</View>

				<View style={styles.mainContainer}>
					<View style={styles.contentContainer}>
						<View style={styles.mainTextContainer}>
							<Text style={styles.mainText}>{missingData?.missingTitle}</Text>
						</View>
					</View>

					<View style={styles.addresscontainer}>
						<View style={styles.missingtitle}>
							<Text style={styles.missingDateText1}>발견 시간</Text>
							<Text style={styles.missingDateText}>
								{missingData?.missingDate?.slice(0, 10)}
							</Text>
						</View>
						<View style={styles.missingaddress}>
							<Text style={styles.missingDateText2}>실종 장소</Text>
							<Text>{missingData?.missingAddress?.slice(0, 20)}</Text>
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
