import {
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
} from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import PatrolDiaryWriteLayout from "../styles/patrolDiaryWriteLayout";

import img from "../../assets/images/debug-dog.png";
import PatrolDiaryCarousel from "../recycles/PatrolDiaryCarousel";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";
import CustomSubButton from "../recycles/CustomSubBtn";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigation } from "@react-navigation/native";
import EditImage from "../recycles/ReportEditImg";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { S3 } from "aws-sdk";

const PatrolDiaryWrite = () => {
	const navigation = useNavigation();
	const [logs, setLogs] = useState([]);
	const [selectedImg, setSelectedImg] = useState(null);
	const [patrolReportTitle, setPatrolReportTitle] = useState("");
	const [patrolReportContent, setPatrolReportContent] = useState("");
	const [patrolReportImageList, setPatrolReportImageList] = useState([
		"https://dangdangranger.s3.ap-northeast-2.amazonaws.com/map_2023-11-03T07%3A02%3A19.564Z_1072956.png",
	]);
	const [patrolLogNo, setPatrolLogNo] = useState(1);
	const [detailLogs, setDetailLogs] = useState({
		patrolLogAddress: "",
		patrolLogDate: "",
		patrolLogTotalDistance: 0,
		patrolLogTotalTime: 0,
	});
	const [patrolImgList, setPatrolImgList] = useState([]);

	const s3 = new S3({
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,
	});

	useEffect(() => {
		getLogs();
	}, []);

	useEffect(() => {
		console.log(detailLogs);
	}, [detailLogs]);

	const getLogs = async () => {
		try {
			const response = await axios.get("/log");

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

	const uploadImage = async (patrolImgList: any) => {
		if (patrolImgList.length === 0) {
			Alert.alert("사진을 등록해주세요.");
			return;
		}

		if (patrolReportTitle === "") {
			Alert.alert("제목을 입력해주세요.");
			return;
		}

		if (patrolReportContent === "") {
			Alert.alert("내용을 입력해주세요.");
			return;
		}

		const uploadPromises = patrolImgList.map(async (imageUri, index) => {
			const response = await fetch(imageUri);
			const blob = await response.blob();
			const type = blob.type;
			const random = Math.floor(Math.random() * 100000000);
			const filename = `profile_${new Date().toISOString()}_${random}.png`;
			const params = {
				Bucket: process.env.AWS_BUCKET,
				Key: filename,
				Body: blob,
				ContentType: type,
			};

			return new Promise((resolve, reject) => {
				s3.upload(params, (err, data) => {
					if (err) {
						console.log(
							"Error occured while trying to upload to S3 bucket",
							err,
						);
						reject(err);
					} else {
						console.log("Upload success:", data);
						resolve(data.Location);
					}
				});
			});
		});

		try {
			// 모든 프로미스가 완료될 때까지 기다립니다.
			const uploadedImages = await Promise.all(uploadPromises);
			axios
				.post("/patrol", {
					patrolReportTitle: patrolReportTitle,
					patrolReportContent: patrolReportContent,
					patrolReportImageList: uploadedImages,
					patrolLogNo: patrolLogNo,
				})
				.then((res) => {
					console.log("성공:", res.data);
					if (res.data.message === "순찰일지 등록 성공") {
						Alert.alert("순찰일지 등록 성공", "순찰 일지 화면으로 이동합니다.");
						navigation.navigate("PatrolDiary");
					}
				})
				.catch((err) => {
					console.log("에러;", err);
				});

			// setSubmitImgList(uploadedImages);
			console.log("uploadedImages::::::", uploadedImages);
		} catch (error) {
			console.error("An error occurred during the upload", error);
		}
	};
	const removeImageFromPatrolImgList = (indexToRemove) => {
		setPatrolImgList((currentImages) =>
			currentImages.filter((_, index) => index !== indexToRemove),
		);
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="순찰 일지 작성" />
				<View style={PatrolDiaryWriteLayout.container}>
					<View style={PatrolDiaryWriteLayout.titleWrap}>
						<Text style={PatrolDiaryWriteLayout.titleText}>
							순찰 기록을 클릭해{"\n"}
							<Text style={PatrolDiaryWriteLayout.titleTextColored}>
								순찰 일지 작성
							</Text>
							을 해보세요
						</Text>
					</View>
					<View style={PatrolDiaryWriteLayout.logWrap}>
						<PatrolDiaryCarousel logs={logs} setDetailLogs={setDetailLogs} />
					</View>
					<View style={PatrolDiaryWriteLayout.formWrap}>
						<TouchableOpacity
							activeOpacity={0.7}
							// onPress={pickImage}
						>
							<View
								style={{
									justifyContent: "center",
									marginLeft: responsiveWidth(20),
									marginTop: responsiveHeight(2),
								}}
							>
								<Text style={{ fontSize: 15 }}>
									<Text style={{ color: "#FF6A6A" }}>순찰 기록 장소:</Text>
									{detailLogs.patrolLogAddress}
								</Text>

								<Text style={{ fontSize: 15 }}>
									<Text style={{ color: "#3D6CC9" }}>순찰 기록 날짜:</Text>
									{detailLogs.patrolLogDate}
								</Text>
							</View>
							<View style={{ width: responsiveWidth(100) }}>
								<EditImage
									selectedImg={selectedImg}
									setSelectedImg={setSelectedImg}
									patrolImgList={patrolImgList}
									setPatrolImgList={setPatrolImgList}
								/>
							</View>
						</TouchableOpacity>
						<View style={PatrolDiaryWriteLayout.theeimgcontainer}>
							{patrolImgList?.map((img, index) => {
								return (
									<View key={`img_${index}`}>
										<Image
											source={{ uri: img }}
											style={PatrolDiaryWriteLayout.threeimg}
										/>
										<TouchableOpacity
											onPress={() => removeImageFromPatrolImgList(index)}
										>
											<View style={PatrolDiaryWriteLayout.deleteContainer}>
												<Text style={PatrolDiaryWriteLayout.deleteText}>
													삭제하기
												</Text>
											</View>
										</TouchableOpacity>
									</View>
								);
							})}
						</View>
						<TextInput
							style={PatrolDiaryWriteLayout.formInput}
							value={patrolReportTitle}
							onChangeText={(text) => setPatrolReportTitle(text)}
							placeholder="제목을 작성해주세요."
							onBlur={() => {}}
						/>

						<View>
							<Text style={PatrolDiaryWriteLayout.textAlign}>
								순찰 일지 내용 작성
							</Text>
						</View>
						<TextInput
							style={[
								PatrolDiaryWriteLayout.formInput,
								PatrolDiaryWriteLayout.textDesc,
							]}
							value={patrolReportContent}
							onChangeText={(text) => {
								setPatrolReportContent(text);
							}}
							placeholder="순찰 일지 내용을 작성해주세요."
							onBlur={() => {}}
						/>
						<CustomSubButton
							text={"순찰일지 기록하기"}
							onPress={() => {
								uploadImage(patrolImgList);
							}}
							color={"#70C8EE"}
						/>
					</View>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolDiaryWrite;
