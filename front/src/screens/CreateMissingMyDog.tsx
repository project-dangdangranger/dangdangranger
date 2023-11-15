import {
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
	ScrollView,
} from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import PatrolDiaryWriteLayout from "../styles/patrolDiaryWriteLayout";
import CustomSubButton from "../recycles/CustomSubBtn";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useNavigation } from "@react-navigation/native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { S3 } from "aws-sdk";
import CustomText from "../recycles/CustomText";
import CreateProfileLayout from "../styles/createProfileLayout";
import DatePickerIcon from "../../assets/images/date-picker-icon.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import DogItemReport from "../components/DogItemReport";
import GeoLocationAPI from "../components/GeoLocationAPI";

const PatrolDiaryWrite = () => {
	const navigation = useNavigation();

	const handleConfirm = (date: Date) => {
		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const hour = date.getHours().toString().padStart(2, "0");
		const minute = date.getMinutes().toString().padStart(2, "0");
		const second = date.getSeconds().toString().padStart(2, "0");
		setMissingDate(
			year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second,
		);
		hideDatePicker();
		console.log(missingDate);
	};

	const [dogList, setDogList] = useState([]);
	useFocusEffect(
		React.useCallback(() => {
			axios.get("/dog").then((res) => {
				// console.log("도그: ", res.data.data);
				setDogList(res.data.data);
			});
		}, []),
	);

	const [address, setAddress] = useState("");

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [patrolReportTitle, setPatrolReportTitle] = useState("");
	const [patrolReportContent, setPatrolReportContent] = useState("");
	const [missingDate, setMissingDate] = useState("");
	const [patrolImgList, setPatrolImgList] = useState([]);
	const [dogNo, setDogNo] = useState(0);
	const [dogImg, setDogImg] = useState([]);

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

		if (dogNo === null) {
			Alert.alert("순찰견을 선택해주세요");
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

			// console.log("도그넘버:", dogNo);

			axios
				.post("/missing", {
					missingTypeNo: 1,
					missingTitle: patrolReportTitle,
					missingContent: patrolReportContent,
					missingDate: missingDate,
					missingLat: missinglat,
					missingLng: missinglong,
					missingImages: uploadedImages,
					dogNo: dogNo,
					missingAddress: address,
				})
				.then((res) => {
					console.log("성공:", res.data);
					if (res.data.message === "실종견 등록 성공") {
						Alert.alert(
							"실종견(신고) 등록 성공",
							"실종견 리스트로 넘어갑니다.",
						);
						navigation.navigate("MissingFind");
					}
				})
				.catch((err) => {
					console.log("에러;", err.message);
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

	const [isSelected, setIsSelected] = useState(false);
	const [selectedDog, setSelectedDog] = useState(null);
	const [scrollEnabled, setScrollEnabled] = useState(true);

	const handleSelectedDog = (item: any) => {
		console.log(item.dogNo);
		setIsSelected(!isSelected);
		setDogImg([item?.dogImg]);
		setDogNo(item.dogNo);
		setScrollEnabled(!scrollEnabled);
	};

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
					mainText="실종견을 위해"
					emphasizedText="등록 정보"
					emphasizedColor="#FF6A6A"
					finalText="를 작성해주세요."
				/>
				<View style={PatrolDiaryWriteLayout.container}>
					<View style={PatrolDiaryWriteLayout.formWrap}>
						<ScrollView
							horizontal={true}
							pagingEnabled={true}
							scrollEnabled={scrollEnabled}
							style={{ marginVertical: responsiveHeight(2) }}
						>
							{dogList?.map((item, index) => {
								return (
									<View style={{ marginHorizontal: responsiveWidth(5) }}>
										<DogItemReport
											key={index}
											item={item}
											isSelected={isSelected}
											onSelected={() => {
												handleSelectedDog(item);
											}}
										/>
									</View>
								);
							})}
						</ScrollView>
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

						<View style={{ marginBottom: 20 }}>
							<Text
								style={{
									textAlign: "center",
									fontSize: 15,
									fontWeight: "bold",
									marginBottom: 10,
									color: "#3E6DCA",
								}}
							>
								{" "}
								현재 위치{" "}
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
									{"       "} {missingDate}
								</Text>
							</View>
						</TouchableOpacity>
						<CustomSubButton
							text={"실종견 등록하기"}
							onPress={() => {
								uploadImage(dogImg);
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
