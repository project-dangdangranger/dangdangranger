import Main from "./Main";
import Login from "./Login";
import EncryptedStorage from "react-native-encrypted-storage";
import React, { useEffect, useState } from "react";

const Start = () => {
	const [tokn, setToken] = useState("");
	async function retrieveToken() {
		try {
			const token = await EncryptedStorage.getItem("accessToken");
			if (token !== undefined) {
				setToken(token);
				return token;
			}
		} catch (error) {
			// 에러가 발생했습니다.
			console.log(error);
		}
	}

	useEffect(() => {
		retrieveToken();
	}, []);

	return <>{tokn ? <Main /> : <Login />}</>;
};

export default Start;
