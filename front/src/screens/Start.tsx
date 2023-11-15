import Main from "./Main";
import Login from "./Login";
import EncryptedStorage from "react-native-encrypted-storage";
import React, { useEffect, useState } from "react";
import { isLogged } from "../atoms/atoms";
import { useRecoilState } from "recoil";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const Start = () => {
	const [islogged, setIsLogged] = useRecoilState(isLogged);
	const navigation = useNavigation();

	async function getAccessToken() {
		const accessToken = await EncryptedStorage.getItem("accessToken");
		console.log("accessToken: ", accessToken);
		if (accessToken !== null) {
			setIsLogged(true);
		}
	}

	useFocusEffect(
		React.useCallback(() => {
			getAccessToken().then(() => {
				if (islogged === true) {
					navigation.navigate("Main");
				}
			});
		}, []),
	);

	return (
		<>
			<Login />
		</>
	);
};

export default Start;
