import React, { useEffect } from "react";
import { Button } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { WEB_CLIENT_ID } from "@env";

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
			const userInfo = await GoogleSignin.signIn();
			console.log(userInfo.idToken);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Button title="Google 로그인" onPress={handleGoogleLogin} />
			<Button title="Google 로그아웃" onPress={GoogleSignin.signOut} />
		</>
	);
};

export default GoogleLogin;
