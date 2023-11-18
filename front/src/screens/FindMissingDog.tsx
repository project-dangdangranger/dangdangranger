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
import { useEffect, useRef, useState } from "react";
import axios from "../utils/axios";
import { useNavigation } from "@react-navigation/native";
import EditImage from "../recycles/ReportEditImg";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { S3 } from "aws-sdk";
import CustomText from "../recycles/CustomText";
import CreateProfileLayout from "../styles/createProfileLayout";
import DatePickerIcon from "../../assets/images/date-picker-icon.png";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Geolocation from "@react-native-community/geolocation";

const FindMissingDog = ({ route }: any) => {
	const navigation = useNavigation();
	const { myLatitude, myLongitude, missingNo, setMyLatitude, setMyLongitude } =
		route.params;

	const myPosition = useRef<any>({});

	useEffect(() => {
		console.log("missingNo:::", missingNo);
		console.log("myLatitude:::", myLatitude);
		console.log("myLongitude:::", myLongitude);

		Geolocation.getCurrentPosition(
			(position) => {
				const latitude = Number(JSON.stringify(position.coords.latitude));
				const longitude = Number(JSON.stringify(position.coords.longitude));
				myPosition.current = {
					latitude,
					longitude,
				};
				console.log("getGeoLocation: ", latitude, longitude);
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 },
		);
	}, []);

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

	const logs = [
		{ logNo: 0, imgSrc: img, date: "22-02-02" },
		{ logNo: 1, imgSrc: img, date: "22-02-02" },
		{ logNo: 2, imgSrc: img, date: "22-02-02" },
		{ logNo: 3, imgSrc: img, date: "22-02-02" },
		{ logNo: 4, imgSrc: img, date: "22-02-02" },
	];

	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [selectedImg, setSelectedImg] = useState(null);
	const [patrolReportTitle, setPatrolReportTitle] = useState("");
	const [patrolReportContent, setPatrolReportContent] = useState("");
	const [missingDate, setMissingDate] = useState("");

	const [patrolReportImageList, setPatrolReportImageList] = useState([
		"https://dangdangranger.s3.ap-northeast-2.amazonaws.com/map_2023-11-03T07%3A02%3A19.564Z_1072956.png",
	]);
	const [patrolLogNo, setPatrolLogNo] = useState(1);

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

		// 모든 프로미스가 완료될 때까지 기다립니다.
		const uploadedImages = await Promise.all(uploadPromises);
		console.log(
			`missingNo: ${missingNo}, searchReportLat: ${myPosition.current.latitude}, searchReportLng: ${myPosition.current.longitude},`,
		);
		const response = await axios.post("/searchreport", {
			missingNo,
			searchReportContent: patrolReportContent,
			searchReportLat: myPosition.current.latitude,
			searchReportLng: myPosition.current.longitude,
			searchReportImages: uploadedImages,
		});

		console.log("response:", response);

		if (response.status === 200) {
			Alert.alert("찾아주세요 신고가 완료되었습니다.");
			navigation.navigate("MissingFind", {
				missingNo: missingNo,
				myLatitude: myLatitude,
				myLongitude: myLongitude,
			});
		}
		console.log("uploadedImages::::::", uploadedImages);
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

	return (
		<>
			<CommonLayout>
				<ColorHeader title="신고하기" />
				<CustomText
					mainText="실종된 강아지를"
					emphasizedText="주인"
					emphasizedColor="#FF6A6A"
					finalText="에게 신고해주세요."
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
						{/* <TextInput
							style={PatrolDiaryWriteLayout.formInput}
							value={patrolReportTitle}
							onChangeText={(text) => setPatrolReportTitle(text)}
							placeholder="제목을 작성해주세요."
							onBlur={() => {}}
						/> */}

						<View>
							<Text style={PatrolDiaryWriteLayout.textAlign}>
								실종 신고 내용 작성
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
							placeholder="실종 신고 내용을 작성해주세요."
							multiline={true}
							onBlur={() => {}}
						/>
						<DateTimePickerModal
							isVisible={isDatePickerVisible}
							mode="date"
							onConfirm={handleConfirm}
							onCancel={hideDatePicker}
						/>
						{/* <TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
							<View style={PatrolDiaryWriteLayout.dateInput}>
								<Image
									style={PatrolDiaryWriteLayout.dateImg}
									source={DatePickerIcon}
								/>
								<Text style={CreateProfileLayout.dateFormText}>
									{"       "} {missingDate}
								</Text>
							</View>
						</TouchableOpacity> */}
						<CustomSubButton
							text={"실종 신고 등록하기"}
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

export default FindMissingDog;
