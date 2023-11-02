import { useEffect, useRef, useState } from "react";
import {
	View,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	Alert,
	Text,
} from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import AbsoluteVar from "../recycles/FooterBar";
import CustomButton from "../recycles/CustomBtn";
import NFTImg from "../../assets/images/NFTImg.png";
import CustomText from "../recycles/CustomText";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import Clipboard from "@react-native-community/clipboard";
import copy from "../../assets/images/copy.png";
import axios from "../utils/axios";
import { useNavigation } from "@react-navigation/native";

const Profile = ({ checkout }: any) => {
	const navigation = useNavigation();
	console.log(checkout.userWalletAddress);
	const [password, setPassword] = useState("");

	const copyToClipboard = () => {
		Clipboard.setString(checkout.userWalletAddress);
		Alert.alert("클립보드에 복사되었습니다!");
	};

	const AlertSubmit = () => {
		if (!password) {
			Alert.alert("비밀번호를 입력해주세요.");
		}

		axios
			.post("/user/wallet", {
				userWalletPw: password,
			})
			.then((data) => {
				console.log("data.data.data: ", data);
				// navigation.navigate("Main");
			})
			.catch((err) => {
				console.log("errdpfjs에러니?: ", err.response);
			});
	};

	// 비밀번호 수정
	// axios
	// .put("/user/wallet", {
	// 	userWalletAddress: checkout.userWalletAddress,
	// 	userWalletPw: password,
	// })
	// .then((data) => {
	// 	console.log("data.data.data: ", data);
	// 	navigation.navigate("Main");
	// });

	return (
		<>
			<>
				<CommonLayout>
					<ColorHeader title="주소 관리" />

					<CustomText
						mainText="반려견 대원들을 위해"
						emphasizedText="소중한 정보"
						emphasizedColor="#70C8EE"
						finalText="를 수정해드려요"
					/>

					<View style={styles.imgcontainer}>
						<Image style={styles.img} source={NFTImg} />
					</View>

					<View style={styles.container}>
						<Text style={styles.walletText}>내 지갑 주소 확인하기</Text>
						<TextInput
							style={styles.textInput}
							value={checkout.userWalletAddress}
							editable={false}
							selectTextOnFocus={false}
							multiline
						/>
						<TouchableOpacity style={styles.copyBtn} onPress={copyToClipboard}>
							<Image source={copy} />
						</TouchableOpacity>
					</View>

					<View style={styles.container}>
						<TextInput
							style={styles.textInput}
							value={password}
							onChangeText={setPassword} // 입력값 변경 시 password 상태 업데이트
							placeholder={"비밀번호를 입력해주세요"}
							secureTextEntry={true} // 입력값 마스킹 활성화
						/>
					</View>

					<CustomButton text="지갑 발급하기" onPress={AlertSubmit} />
				</CommonLayout>
				<AbsoluteVar />
			</>
		</>
	);
};

export default Profile;

const styles = StyleSheet.create({
	imgcontainer: {
		justifyContent: "center",
		alignItems: "center",
		marginVertical: responsiveHeight(3),
	},
	img: {
		width: responsiveHeight(20),
		height: responsiveHeight(20),
	},
	container: {
		flex: 1,
		justifyContent: "center",
		// alignItems: "center",
		padding: 20,
		position: "relative",
	},
	textInput: {
		width: "100%",
		borderWidth: 1,
		borderColor: "gray",
		padding: 10,
	},
	copyBtn: {
		position: "absolute",
		bottom: responsiveHeight(3),
		right: responsiveWidth(8),

		padding: 10,
		borderRadius: 5,
	},
	walletText: {
		fontSize: 17,
		fontWeight: "bold",
		marginBottom: responsiveHeight(1),
	},
});
