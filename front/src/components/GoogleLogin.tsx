import React, { useEffect } from "react";
import { Button } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID } from "@env";
import axios from "axios";
import EncryptedStorage from "react-native-encrypted-storage";
import { BASE_URL, CONTENT_TYPE, TIMEOUT } from "../Constants/constants";
const GoogleLogin = () => {
	useEffect(() => {
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
				console.log("회원가입 성공했습니다. 추가정보를 입력해야합니다.");
				// navigation.navigate("AddInfo"); 그에 대한 로직이 필요함
			} else if (responseCheckUserInfo.data.data.signInUp === "로그인 성공") {
				console.log("로그인 성공했습니다. 메인페이지로 이동합니다.");
				// navigation.navigate("Main"); 그에 대한 로직이 필요함
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleGoogleLogout = async () => {
		try {
			await GoogleSignin.revokeAccess();
			await GoogleSignin.signOut();
			await EncryptedStorage.removeItem("accessToken");
			await EncryptedStorage.removeItem("refreshToken");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Button title="Google 로그인" onPress={handleGoogleLogin} />
			<Button title="Google 로그아웃" onPress={handleGoogleLogout} />
		</>
	);
};

export default GoogleLogin;
