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
import PatrolLogCarousel from "../recycles/PatrolLogCarousel";
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
import CustomText from "../recycles/CustomText";
import CreateProfileLayout from "../styles/createProfileLayout";
import DatePickerIcon from "../../assets/images/date-picker-icon.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import GeoLocationAPI from "../components/GeoLocationAPI";

const PatrolDiaryWrite = () => {
	const navigation = useNavigation();

	const handleConfirm = (date: Date) => {
		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const hour = date.getDate().toString().padStart(2, "0");
		const minute = date.getDate().toString().padStart(2, "0");
		const second = date.getDate().toString().padStart(2, "0");
		setMissingDate(
			year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second,
		);
		hideDatePicker();
		console.log(missingDate);
	};

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [selectedImg, setSelectedImg] = useState(null);
	const [patrolReportTitle, setPatrolReportTitle] = useState("");
	const [patrolReportContent, setPatrolReportContent] = useState("");
	const [missingDate, setMissingDate] = useState("");
	const [patrolImgList, setPatrolImgList] = useState([]);

	const s3 = new S3({
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,
	});

	// const [submitImgList, setSubmitImgList] = useState([]);

	const uploadImage = async (patrolImgList: any) => {
		if (patrolImgList.length === 0) {
			Alert.alert("이미지를 등록해주세요");
			return;
		}

		if (patrolReportTitle.length === 0) {
			Alert.alert("제목을 작성해주세요");
			return;
		}

		if (patrolReportContent.length === 0) {
			Alert.alert("내용을 작성해주세요");
			return;
		}

		if (missingDate.length === 0) {
			Alert.alert("신고 일자를 등록해주세요");
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

		console.log("hello:::", patrolReportTitle);

		try {
			// 모든 프로미스가 완료될 때까지 기다립니다.
			const uploadedImages = await Promise.all(uploadPromises);
			axios
				.post("/missing", {
					missingTypeNo: 2,
					missingTitle: patrolReportTitle,
					missingContent: patrolReportContent,
					missingDate: missingDate,
					missingLat: missinglat,
					missingLng: missinglong,
					missingImages: uploadedImages,
					missingAddress: address,
				})
				.then((res) => {
					console.log("성공:", res.data);
					if (res.data.message === "실종견 등록 성공") {
						// Alert.alert(
						// 	"실종견(신고) 등록 성공",
						// 	"실종 화면 디테일로 이동합니다.",
						// );
						navigation.navigate("MissingFind");
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

	// date
	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const [address, setAddress] = useState("");
	const [missinglat, setMissinglat] = useState(0);
	const [missinglong, setMissinglong] = useState(0);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="신고하기" />
				<GeoLocationAPI
					setAddress={setAddress}
					setMissinglat={setMissinglat}
					setMissinglong={setMissinglong}
				/>
				<CustomText
					mainText="유기견을 위해"
					emphasizedText="강아지 정보"
					emphasizedColor="#FF6A6A"
					finalText="를 작성해주세요."
				/>
				<View style={PatrolDiaryWriteLayout.container}>
					<View style={PatrolDiaryWriteLayout.formWrap}>
						<TouchableOpacity
							activeOpacity={0.7}
							// onPress={pickImage}
						>
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
						<View style={{ marginVertical: responsiveHeight(3) }}>
							<Text
								style={{
									textAlign: "center",
									fontSize: 15,
									fontWeight: "bold",
									marginBottom: 10,
									color: "#3E6DCA",
								}}
							>
								현재 위치
							</Text>
							<Text>{address}</Text>
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
								강아지 정보 작성
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
							placeholder="강아지 정보를 작성해주세요."
							multiline={true}
							onBlur={() => {}}
						/>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode="date"
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
						/>
						<TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
							<View style={PatrolDiaryWriteLayout.dateInput}>
								<Image
									style={PatrolDiaryWriteLayout.dateImg}
									source={DatePickerIcon}
								/>
								<Text style={CreateProfileLayout.dateFormText}>
									{"       "} {missingDate.split("T")[0]}
								</Text>
							</View>
						</TouchableOpacity>
						<CustomSubButton
							text={"유기견 신고하기"}
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
