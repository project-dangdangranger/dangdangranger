import { Text, View, TextInput, StyleSheet, Alert } from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import MainHeader from "../recycles/MainHeader";
import FooterBar from "../recycles/FooterBar";
import LoginLayout from "../styles/loginLayout";
import React, { useEffect } from "react";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import EditImage from "../recycles/EditImage";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import axios from "../utils/axios";
import CustomSubBtn from "../recycles/CustomSubBtn";
import { S3 } from "aws-sdk";
import {
	AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION,
	AWS_BUCKET,
} from "@env";
import { Buffer } from "buffer";
import ColorHeader from "../recycles/ColorHeader";

const Login = ({ navigation }: any) => {
	const [selectedImg, setSelectedImg] = useState("");
	const [nickname, setNickname] = useState("");
	const [selectedSi, setSelectedSi] = useState();
	const [selectedGugun, setSelectedGugun] = useState();
	const [selectedDong, setSelectedDong] = useState();
	const [si, setSi] = useState([]);
	const [guguns, setGuguns] = useState([]);
	const [dong, setDong] = useState([]);

	const s3 = new S3({
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: AWS_REGION,
	});

	const handleNicknameChange = (newNickname: any) => {
		setNickname(newNickname);
	};

	useEffect(() => {
		axios.get("/region/sido").then((res) => {
			setSi(res.data.data.sidos);
		});
	}, [selectedSi]);

	const getGu = (itemValue: any) => {
		axios.get(`/region/gugun?sido=${itemValue}`).then((res) => {
			// console.log("레스:", res.data.data.guguns);
			setGuguns(res.data.data.guguns);
		});
	};

	const getDong = (itemValue: any) => {
		axios.get(`/region/dong?gugun=${itemValue}`).then((res) => {
			// console.log("레스:", res.data.data.dongs);
			setDong(res.data.data.dongs);
		});
	};

	const uploadImage = async (imageUri: string) => {
		// console.log("img", imageUri);
		const blob = Buffer.from(imageUri, "base64");
		// console.log("blob : ", blob);
		// key = 지금 날짜와 시간
		const params = {
			Bucket: AWS_BUCKET,
			Key: `${Date.now()}.png`,
			Body: blob,
			ContentType: "image/png",
		};

		try {
			const data = await s3.upload(params).promise();
			console.log("File uploaded:", data);
			// 업로드 후의 로직 (예: URL을 서버에 저장하는 등)
		} catch (err) {
			console.error("Upload failed:", err);
		}
	};

	const submitRegister = () => {
		console.log("헬로우:", nickname);
		console.log("사진:", selectedImg);
		console.log("동:", selectedDong);

		if (!nickname) {
			Alert.alert("닉네임을 입력해주세요.");
			return;
		}

		if (!selectedDong) {
			Alert.alert("동을 선택해주세요.");
			return;
		}

		if (!selectedImg) {
			Alert.alert("프로필 사진을 선택해주세요.");
			return;
		}

		const s3Img = uploadImage(selectedImg);
		console.log("s3Img:", s3Img);

		// axios
		// 	.put(`/user`, {
		// 		userName: nickname,
		// 		userDong: selectedDong,
		// 		userProfileImg: selectedImg,
		// 	})
		// 	.then((res) => {
		// 		if (res.data.message === "회원 정보 수정 완료") {
		// 			navigation.navigate("Main");
		// 		}
		// 	});
	};

	// wjwkd anj

	return (
		<>
			<></>
			<CommonLayout>
				<ColorHeader title="회원정보입력" />

				<View style={LoginLayout.textregister}>
					<Text style={LoginLayout.Text1}>회원 정보입력</Text>
				</View>

				<EditImage setSelectedImg={setSelectedImg} />

				<View style={styles.formInputContainer}>
					<Text style={styles.nicknameText}>닉네임</Text>
					<TextInput
						style={styles.formInput1}
						value={nickname}
						onChangeText={handleNicknameChange}
						placeholder="사용자 닉네임을 입력해주세요."
						maxLength={20}
					/>
				</View>
				<View style={styles.pickers}>
					<View style={styles.pickerRow}>
						<Text style={styles.pickerRowText}>시</Text>
						<View style={styles.pickerConitaner}>
							<Picker
								selectedValue={selectedSi}
								onValueChange={(itemValue, itemIndex) => {
									setSelectedSi(itemValue);
									getGu(itemValue);
								}}
								style={styles.pickerSi}
							>
								{si?.map((item, index) => {
									return (
										<Picker.Item
											label={item.sidoName}
											value={item.sidoCode}
											key={index}
										/>
									);
								})}
							</Picker>
						</View>
					</View>

					<View style={styles.pickerRow}>
						<Text style={styles.pickerRowText}>구</Text>

						<View style={styles.pickerConitaner}>
							<Picker
								selectedValue={selectedGugun}
								onValueChange={(itemValue, itemIndex) => {
									setSelectedGugun(itemValue);
									getDong(itemValue);
								}}
								style={styles.pickerSi}
							>
								{guguns?.map((item, index) => {
									return (
										<Picker.Item
											label={item.gugunName}
											value={item.gugunCode}
											key={index}
										/>
									);
								})}
							</Picker>
						</View>
					</View>

					<View style={styles.pickerRow}>
						<Text style={styles.pickerRowText}>동</Text>

						<View style={styles.pickerConitaner}>
							<Picker
								selectedValue={selectedDong}
								onValueChange={(itemValue, itemIndex) =>
									setSelectedDong(itemValue)
								}
								style={styles.pickerSi}
							>
								{dong.map((item, index) => {
									return (
										<Picker.Item
											label={item.dongName}
											value={item.dongCode}
											key={index}
										/>
									);
								})}
							</Picker>
						</View>
					</View>
				</View>
				<View style={styles.customBtn}>
					<CustomSubBtn
						text="회원가입"
						color={"#0349A1"}
						onPress={submitRegister}
					/>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default Login;

const styles = StyleSheet.create({
	formInputContainer: {
		marginVertical: responsiveHeight(5),
		marginHorizontal: responsiveWidth(10),
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
		width: responsiveWidth(70),
	},
	formInput1: {
		borderColor: "#9D9D9D",
		borderWidth: 1,
		width: responsiveWidth(50),
		height: responsiveHeight(5),
		borderRadius: 5,
	},
	formInput1Btn: {
		width: responsiveWidth(20),
		backgroundColor: "#0349A1",
		height: responsiveHeight(5),
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	forInput1BtnText: {
		color: "#fff",
		fontSize: 15,
		fontWeight: "bold",
	},
	pickerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: responsiveWidth(60),
	},
	pickerConitaner: {
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#9D9D9D",
		width: responsiveWidth(50),
		borderRadius: 5,
		height: responsiveHeight(5),
		// marginBottom: responsiveHeight(2),
	},
	pickerSi: {
		width: responsiveWidth(50),
		borderColor: "#9D9D9D",
		borderWidth: 1,
		// backgroundColor: "#fff",
	},
	pickers: {
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "space-between",
		height: responsiveHeight(18),
	},
	pickerRowText: {
		fontSize: 15,
		fontWeight: "bold",
	},
	nicknameText: {
		fontSize: 15,
		fontWeight: "bold",
		marginLeft: responsiveWidth(3),
	},
	customBtn: {
		marginTop: responsiveHeight(5),
	},
});
