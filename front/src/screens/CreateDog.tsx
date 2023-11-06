import { View, Text, StyleSheet, TextInput } from "react-native";
// import GestureFlipView from "../components/GestureFlipView";
import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import AbsoluteVar from "../recycles/FooterBar";
import CustomText from "../recycles/CustomText";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomSubButton from "../recycles/CustomSubBtn";
import EditImage from "../recycles/EditImage";
import { S3 } from "aws-sdk";
import axios from "../utils/axios";
import { useState } from "react";

const CreateDog = ({ navigation }: any) => {
	const [selectedImg, setSelectedImg] = useState("");
	const s3 = new S3({
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		region: process.env.AWS_REGION,
	});

	const uploadImage = async (imageUri: string) => {
		// console.log("img", imageUri);
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
		s3.upload(params, (err: any, data: any) => {
			if (err) {
				console.log("Error occured while trying to upload to S3 bucket", err);
			} else {
				// 여기에 원하는 엑시오스 요청을 보내면 됩니다.
				console.log("params:", params, "data:", data);
				// axios
				// 	.put("/user", {
				// 		userName: nickname,
				// 		userDong: selectedDong,
				// 		userProfileImg: data.Location,
				// 	})
				// 	.then((data) => {
				// 		if (data.data.message === "회원 정보 수정 완료") {
				// 			Alert.alert("정보 수정 완료", "정보 수정이 완료되었습니다.");
				// 			navigation.navigate("Profile", { updated: true });
				// 		}
				// 	});
			}
		});
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="강아지 관리" />
				<View>
					<CustomText
						mainText="방범대원증을"
						emphasizedText="NFT"
						emphasizedColor="#3D6CC9"
						finalText="로 등록해보세요"
					/>
				</View>
				<View style={styles.viewcontainer}>
					<View style={styles.imageupdate}>
						<EditImage
							selectedImg={selectedImg}
							setSelectedImg={setSelectedImg}
						/>
					</View>
					<View>
						<Text style={styles.textAlign}>반려견의 이름을 입력해주세요.</Text>
					</View>
					<TextInput
						style={styles.formInput}
						// value={petSpecies || ""}
						onChangeText={() => {}}
						placeholder="반려견 이름을 입력해주세요."
						onBlur={() => {}}
					/>

					<View>
						<Text style={styles.textAlign}>반려견의 종을 입력해주세요.</Text>
					</View>
					<TextInput
						style={styles.formInput}
						// value={petSpecies || ""}
						onChangeText={() => {}}
						placeholder="반려견 종을 입력해주세요."
						onBlur={() => {}}
					/>

					<View>
						<Text style={styles.textAlign}>반려견의 이름을 입력해주세요.</Text>
					</View>
					<TextInput
						style={[styles.formInput]}
						// value={petSpecies || ""}
						onChangeText={() => {}}
						placeholder="종을 검색해 아래를 클릭하세요"
						onBlur={() => {}}
					/>

					<View>
						<Text style={styles.textAlign}>반려견의 생일을 입력해주세요.</Text>
					</View>
					<TextInput
						style={[styles.formInput, { marginBottom: responsiveHeight(2) }]}
						// value={petSpecies || ""}
						onChangeText={() => {}}
						placeholder="종을 검색해 아래를 클릭하세요"
						onBlur={() => {}}
					/>
				</View>

				<CustomSubButton
					text={"NFT 반려대원 발급하기"}
					onPress={
						() => {}

						// navigation.navigate("MakeDogProfile")
					}
					color={"#70C8EE"}
				/>
			</CommonLayout>
			<AbsoluteVar />
		</>
	);
};

export default CreateDog;

const styles = StyleSheet.create({
	viewcontainer: {
		justifyContent: "center",
		alignItems: "center",
		// marginVertical: responsiveHeight(12),
	},
	imageupdate: {
		width: responsiveWidth(100),
	},
	imgcontainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(5),
	},
	imageUploadWrap: {
		width: responsiveWidth(85),
		height: 110,
		borderWidth: 2,
		borderColor: "#E1E1E1",
		borderRadius: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 24,
	},
	formInput: {
		width: responsiveWidth(85),
		height: 36,
		borderWidth: 1,
		borderColor: "#9D9D9D",
		borderRadius: 2,
		marginTop: 7,
		padding: 6,
	},
	textAlign: {
		marginTop: responsiveHeight(2),
		textAlign: "left",
		width: responsiveWidth(85),
	},
});
