import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL, CONTENT_TYPE, TIMEOUT } from "../constants/constants";
import EncryptedStorage from "react-native-encrypted-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const instance = axios.create({
	baseURL: BASE_URL,
	timeout: TIMEOUT,
});

const getValueFor = async (key: string) => {
	return await EncryptedStorage.getItem(key);
};

const getAuthorizationHeader = async (tokenKey: string) => {
	return `Bearer ${await getValueFor(tokenKey)}`;
};

const setCommonHeaders = async (config: any) => {
	// default header 설정
	config.headers["Content-Type"] = CONTENT_TYPE;
	config.headers["Authorization"] = await getAuthorizationHeader("accessToken");
	return config;
};

const refreshAccessTokenAndRetry = async (config: AxiosRequestConfig) => {
	// accessToken 만료시 refreshToken으로 재발급
	console.log("refreshAccessTokenAndRetry");
	try {
		const response = await axios.post(
			`${BASE_URL}/user/token`,
			{},
			{
				headers: {
					"Content-Type": CONTENT_TYPE,
					Authorization: await getAuthorizationHeader("refreshToken"),
				},
			},
		);
		console.log("response data ㅇㅇㅇ :", response.status);
		if (response.status === 201) {
			const newAccessToken = response.data.data.accessToken;
			await EncryptedStorage.setItem("accessToken", newAccessToken);
			if (!config.headers) {
				config.headers = {};
			}
			config.headers["Authorization"] = `Bearer ${newAccessToken}`;
			return axios(config);
		}
		console.error("refreshAccessTokenAndRetry error :", response);
		return Promise.reject(response);
	} catch (error: any) {
		console.error(error.response.status);
		if (error.response.status === 401) {
			await handleGoogleLogout();
			alert("토큰 갱신에 실패했습니다. 다시 로그인 해주세요.");
			return Promise.reject(error);
		}
	}
};

const handleResponseError = async (error: AxiosError) => {
	if (!error.response) return Promise.reject(error);
	const { status, config } = error.response;
	console.log("status :", status);

	switch (status) {
		case 400:
			alert("올바르지 않은 내용을 입력하셨습니다. 다시 확인해주세요.");
			break;
		case 401:
			return await refreshAccessTokenAndRetry(config);
		case 409:
			alert("동일한 이름의 반려견이 이미 등록되어 있습니다.");
			break;
		case 500:
			alert("시스템 에러, 관리자에게 문의 바랍니다.");
			break;
		default:
			console.error(error);
			return Promise.reject(error);
	}
};

const handleResponseSuccess = (response: any) => {
	console.log("Success response");
	return response;
};

const handleRequestError = (error: AxiosError) => {
	console.error("handleRequestError :", error);
	return Promise.reject(error);
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

instance.interceptors.request.use(setCommonHeaders, handleRequestError);
instance.interceptors.response.use(handleResponseSuccess, handleResponseError);

export default instance;
