import { Text, View, Image, Alert, TouchableOpacity } from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import MainHeader from "../recycles/MainHeader";
import FooterBar from "../recycles/FooterBar";
import LoginImg from "../../assets/images/LoginImg.png";
import LoginLayout from "../styles/loginLayout";
import GoogleImg from "../../assets/images/Google.png";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID } from "@env";
import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
import { BASE_URL, CONTENT_TYPE, TIMEOUT } from "../constants/constants";
import React, { useEffect } from "react";

const Login = ({ navigation }: any) => {
	useEffect(() => {
		console.log(WEB_CLIENT_ID);
		GoogleSignin.configure({
			webClientId: WEB_CLIENT_ID,
			offlineAccess: true,
		});
	}, []);
	const handleGoogleLogin = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const responseCheckSigninData = await GoogleSignin.signIn();
			const url = `${BASE_URL}/user`;
			const responseCheckUserInfo = await axios.post(url, null, {
				headers: {
					Authorization: `Bearer ${responseCheckSigninData.idToken}`,
					"Content-Type": CONTENT_TYPE,
				},
				timeout: TIMEOUT,
			});
			console.log("responseCheckUserInfo.data: ", responseCheckUserInfo.data);
			console.log(
				"responseCheckUserInfo.data.data.signInUp: ",
				responseCheckUserInfo.data.data.signInUp,
			);
			await EncryptedStorage.setItem(
				"accessToken",
				responseCheckUserInfo.data.data.tokenInfo.accessToken,
			);
			await EncryptedStorage.setItem(
				"refreshToken",
				responseCheckUserInfo.data.data.tokenInfo.refreshToken,
			);
			// encryptedStorage에 저장된 토큰을 확인
			const accessToken = await EncryptedStorage.getItem("accessToken");
			const refreshToken = await EncryptedStorage.getItem("refreshToken");
			console.log("accessToken: ", accessToken);
			console.log("refreshToken: ", refreshToken);
			if (responseCheckUserInfo.data.data.signInUp === "회원가입 성공") {
				Alert.alert("구글 로그인 성공", "추가 정보를 입력해야 합니다.");
				navigation.navigate("Register");
			} else if (responseCheckUserInfo.data.data.signInUp === "로그인 성공") {
				console.log("로그인 성공했습니다. 메인페이지로 이동합니다.");
				navigation.navigate("Main");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<></>
			<CommonLayout>
				<MainHeader></MainHeader>

				<View style={LoginLayout.textcontainer}>
					<Text style={LoginLayout.Text1}>로그인해주세요</Text>
					<Text style={LoginLayout.Text2}>
						구글 로그인으로 간편하게 로그인하세요
					</Text>
				</View>

				<View style={LoginLayout.containerImg}>
					<Image source={LoginImg} style={LoginLayout.Img1} />
				</View>

				{/* <Button title="Google 로그아웃" onPress={GoogleSignin.signOut} /> */}
				<TouchableOpacity
					style={LoginLayout.BtnContainer}
					onPress={handleGoogleLogin}
				>
					<View style={LoginLayout.LoginBtn}>
						<Image style={LoginLayout.btnImg} source={GoogleImg} />
						<Text style={LoginLayout.textBtn}>Connect with Google</Text>
					</View>
				</TouchableOpacity>
				<View style={LoginLayout.bottomText}>
					<Text style={LoginLayout.btnText}>
						로그인함으로써
						<Text style={LoginLayout.boldText}>
							{" "}
							개인정보 보호정책 및 개인정보 보호정책
						</Text>
						에 이용약관에 동의합니다
					</Text>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default Login;
