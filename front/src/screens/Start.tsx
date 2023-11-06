import Main from "./Main";
import Login from "./Login";
import EncryptedStorage from "react-native-encrypted-storage";
import React, { useEffect, useState } from "react";
import { isLogged } from "../atoms/atoms";
import { useRecoilState } from "recoil";

const Start = () => {
	const [islogged, setIsLogged] = useRecoilState(isLogged);

	async function getAccessToken() {
		const accessToken = await EncryptedStorage.getItem("accessToken");
		console.log("accessToken: ", accessToken);
		if (accessToken !== null) {
			setIsLogged(true);
		}
	}

	useEffect(() => {
		console.log("Start.tsx의 useEffect() 실행:", islogged);
		getAccessToken();
	}, []);

	return <>{islogged ? <Main /> : <Login />}</>;
};

export default Start;
