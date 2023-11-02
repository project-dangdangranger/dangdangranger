import { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	TextInput,
} from "react-native";
import { ethers } from "ethers";
import EncryptedStorage from "react-native-encrypted-storage";
import CryptoJS from "react-native-crypto-js";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import axios from "axios";

import ColorHeader from "../recycles/ColorHeader";
import WalletProcess from "../components/WalletProcess";
import WalletLoading from "../components/WalletLoading";

import CommonLayout from "../recycles/CommonLayout";
import CreateWalletPasswordLayout from "../styles/createWalletPasswordLayout";

const Profile = ({ navigation }: any) => {
	const [isLoading, setIsLoading] = useState<Boolean>(false);
	const [isChecked, setIsChecked] = useState<Boolean>(false);
	const [password, setPassword] = useState<string>("");
	const [checkPassword, setCheckPassword] = useState<string>("");

	const SECRET_SALT = process.env.SECRET_SALT;

	const createWallet = async () => {
		if (!isChecked) {
			alert("비밀번호 복구불가 안내 문구에 체크해주세요.");
			return;
		}
		if (password !== checkPassword) {
			alert("비밀번호를 다시 확인해주세요.");
			return;
		}
		if (!isLoading) {
			setIsLoading(true);
		}
		try {
			axios.put("/user/wallet", {
				userWalletPw: password,
			});
		} catch (err) {
			alert("지갑 생성 오류, 관리자에게 문의하세요.");
			console.error("비밀번호 저장 오류");
		}
		try {
			axios
				.get("https://www.animaid.co.kr/blockchain/wallet")
				.then(async (data) => {
					const encryptedValue = data.data;
					const decrypted = await decryptValue(encryptedValue, SECRET_SALT);
					const newAccount = await ethers.HDNodeWallet.fromPhrase(decrypted);
					console.log("newAccount", newAccount);
					await EncryptedStorage.setItem("walletAddress", newAccount?.address);
					await EncryptedStorage.setItem("privateKey", newAccount?.privateKey);
					await EncryptedStorage.setItem(
						"mnemonic",
						String(newAccount?.mnemonic?.phrase),
					);
					const walletAddress = await EncryptedStorage.getItem("walletAddress");
					const privateKey = await EncryptedStorage.getItem("privateKey");
					const Mnemonic = await newAccount?.mnemonic?.phrase;
					try {
						const addressDbApi = await axios.put("/user/address", {
							userAddress: walletAddress,
						});
						const walletApi = await axios.put("/user/wallet", {
							userWalletPw: password,
						});
						if (addressDbApi.status === 200 && walletApi.status === 200) {
							setIsLoading(false);
							setIsChecked(false);
							await navigation.navigate("MakeWallet3");
						} else {
							alert("지갑 생성 실패, 관리자에게 문의하세요.");
							setIsLoading(false);
							console.error("Error generating wallet");
						}
					} catch (err) {
						alert("지갑 생성 실패, 관리자에게 문의하세요.");
						setIsLoading(false);
						console.error("Error generating wallet:", err);
					}
				})
				.catch((err) => {
					alert("지갑 생성 실패, 관리자에게 문의하세요.");
					setIsLoading(false);
					console.error("Error generating wallet:", err);
				});
		} catch (error) {
			alert("지갑 생성 실패, 관리자에게 문의하세요.");
			setIsLoading(false);
			console.error("Error generating wallet:", error);
		}
	};

	const decryptValue = (encrypted: any, secretkey: any) => {
		const bytes = CryptoJS.AES.decrypt(encrypted, secretkey);
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		return originalText;
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="지갑 설정" />
				<View style={CreateWalletPasswordLayout.titleWrap}>
					<Text style={CreateWalletPasswordLayout.mainTitle}>
						비밀번호 생성
					</Text>
					<Text style={CreateWalletPasswordLayout.subTitle}>
						이 비밀번호는 이 기기에서 귀하의 POPPY WALLET 지갑을 잠금 해제할
						때만 사용됩니다.
					</Text>
				</View>

				<WalletProcess />

				<View style={CreateWalletPasswordLayout.formWrap}>
					<Text style={CreateWalletPasswordLayout.formTitle}>
						신규 비밀번호
					</Text>
					<TextInput
						placeholder="신규 비밀번호를 입력해주세요."
						style={CreateWalletPasswordLayout.formInput}
						value={password}
						onChangeText={(text) => setPassword(text)}
						secureTextEntry={true}
					/>
					<Text style={CreateWalletPasswordLayout.formTitle}>
						비밀번호 확인
					</Text>
					<TextInput
						placeholder="비밀번호 확인을 위해 다시 입력해주세요."
						style={CreateWalletPasswordLayout.formInput}
						value={checkPassword}
						onChangeText={(text) => setCheckPassword(text)}
						secureTextEntry={true}
					/>
					<View style={CreateWalletPasswordLayout.checkWrap}>
						<BouncyCheckbox
							size={20}
							fillColor="red"
							unfillColor="#FFFFFF"
							iconStyle={{ borderColor: "red" }}
							innerIconStyle={{ borderWidth: 2 }}
							onPress={(isChecked: boolean) => {
								setIsChecked(isChecked);
							}}
						/>
						<Text style={CreateWalletPasswordLayout.checkInfo}>
							POPPY WALLET은 비밀번호를 복구해드릴 수 없습니다. 이를 이해하고
							확인하였습니다.
						</Text>
					</View>
				</View>

				<View style={CreateWalletPasswordLayout.buttonWrap}>
					<TouchableOpacity activeOpacity={0.7} onPress={createWallet}>
						<View style={CreateWalletPasswordLayout.newCreateButton}>
							<Text style={CreateWalletPasswordLayout.newCreateButtonText}>
								비밀번호 생성하기
							</Text>
						</View>
					</TouchableOpacity>
				</View>
				{/* <Footer /> */}
			</CommonLayout>
			{isLoading ? (
				<WalletLoading title="지갑 생성 중.. 잠시만 기다려주세요" />
			) : (
				<></>
			)}
		</>
	);

	// return (
	// 	<>
	// 		<CommonLayout>
	// 			<ColorHeader title="주소 관리" />
	// 			<Text>지갑만들어주세요1</Text>
	// 			<CustomButton
	// 				text="월렛3페이지 이동"
	// 				onPress={() => navigation.navigate("MakeWallet3")}
	// 			/>
	// 		</CommonLayout>
	// 		<AbsoluteVar />
	// 	</>
	// );
};

export default Profile;
