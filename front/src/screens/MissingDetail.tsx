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
import ReportUserInfo from "../components/ReportUserInfo";
import dotIconImg from "../../assets/images/3-dot-icon.png";
import PatrolDiaryLayout from "../styles/patrolDiaryLayout";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import MultiPicture from "../recycles/MultiPicture";

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
		axios
			.post("/patrolcomment", {
				patrolNo: patrolNo,
				userNo: userData?.userNo,
				patrolCommentContent: commentsubmittext,
			})
			.then((res) => {
				setDataVersion((prevVersion) => prevVersion + 1);
				setCommentSubmitText("");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`/patrol/${patrolNo}`);
				if (response.data.message === "순찰일지 상세조회 완료") {
					setData(response.data.data);
					console.log(response.data.data);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [dataVersion]);

	useEffect(() => {
		axios
			.get(`/patrol/${patrolNo}`)
			.then((res) => {
				if (res.data.message === "순찰일지 상세조회 완료") {
					setData(res.data.data);
					console.log(res.data.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		axios
			.get("/user")
			.then((res) => {
				setUserData(res.data.data);
				// console.log(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
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
							<Text style={styles.mainText}>{data?.patrolReportTitle}</Text>
						</View>
					</View>
					<ReportUserInfo data={data} userData={userData} />

					<View style={styles.contentcontainer}>
						<View style={styles.contentText}>
							<Text style={styles.contenttext}>
								{data?.patrolReportContent}
							</Text>
						</View>
						<View style={styles.editContainer}>
							<TouchableOpacity onPress={handlePressThreedot}>
								<View ref={threedotRef} collapsable={false}>
									<Image style={styles.threedot} source={dotIconImg} />
								</View>
							</TouchableOpacity>
							<Modal
								animationType="fade"
								transparent={true}
								visible={modalVisible}
								onRequestClose={() => setModalVisible(false)}
							>
								<TouchableOpacity
									style={styles.modalContainer}
									onPress={() => setModalVisible(false)}
								>
									<View
										style={[
											styles.modalView,
											{ top: modalPosition.top, left: modalPosition.left },
										]}
									>
										<TouchableOpacity
											style={styles.modalItem}
											onPress={() => {
												navigate("PatrolDiaryWrite");
												setModalVisible(false);
											}}
										>
											<Text style={PatrolDiaryLayout.modalText}>
												글 수정하기
											</Text>
										</TouchableOpacity>
									</View>
								</TouchableOpacity>
							</Modal>
						</View>
					</View>

					<View style={styles.commentcontainer}>
						<View style={styles.commentMainContainer}>
							<View style={{ flexDirection: "row" }}>
								<Text style={styles.commentText}>댓글</Text>
								<Text style={styles.commentCount}>
									{data.patrolComments?.length}
								</Text>
							</View>

							<TouchableOpacity style={styles.commentwrite}>
								<Text style={styles.commentwriteText}>댓글 작성</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.commentList}>
							{data.patrolComments?.map((item: any) => {
								const dateTime = `${item.createDate.slice(
									0,
									10,
								)} ${item.createDate.slice(11, 16)}`;

								return (
									<View key={item.patrolCommentNo} style={styles.commentDetail}>
										<View style={styles.centerimg}>
											<Image
												style={styles.commentImg}
												source={{ uri: item.userProfileImg }}
											></Image>
										</View>
										<View style={styles.commentCol}>
											<View style={styles.commentTitle}>
												<Text>{item.userName}</Text>
												<Text>{dateTime}</Text>
												<TouchableOpacity style={styles.settingbtn}>
													<Image
														style={styles.commentSettingImg}
														source={dotIconImg}
													></Image>
												</TouchableOpacity>
											</View>
											<Text style={styles.commentContent}>
												{item.patrolCommentContent}
											</Text>
										</View>
									</View>
								);
							})}
							<View>
								<TextInput
									style={styles.commentInput}
									value={commentsubmittext}
									placeholder="댓글을 입력하세요"
									maxLength={50}
									onChangeText={(text) => {
										setCommentSubmitText(text);
									}}
								></TextInput>
								<TouchableOpacity
									style={styles.commentSumbit}
									onPress={() => {
										commentSubmit();
									}}
								>
									<Text style={styles.subminText}>등록</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolReportDetail;
