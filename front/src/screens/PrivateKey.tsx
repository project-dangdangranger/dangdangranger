import { useEffect, useState } from "react";
import {
	View,
	Image,
	Alert,
	Text,
	StyleSheet,
	Button,
	TouchableOpacity,
} from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import AbsoluteVar from "../recycles/FooterBar";
import CustomText from "../recycles/CustomText";

import axios from "../utils/axios";
import { useNavigation } from "@react-navigation/native";

import ModalPrivateKey from "../components/ModalPrivateKey";
import PrivateKeyLayout from "../styles/PrivatekeyLayout";
import redEye from "../../assets/images/red-eye.png";
import QRCode from "react-native-qrcode-svg";
import CustomButton from "../recycles/CustomSubBtn";
import Clipboard from "@react-native-clipboard/clipboard";
import { walletAddress } from "../atoms/atoms";
import { useRecoilValue } from "recoil";
import EncryptedStorage from "react-native-encrypted-storage";

const Profile = () => {
	const [myPrivateKey, setPrivateKey] = useState("");
	useEffect(() => {
		handleGoogleLogin();
	}, []);
	const handleGoogleLogin = async () => {
		try {
			const privateKey = await EncryptedStorage.getItem("privateKey");
			if (privateKey) {
				setPrivateKey(privateKey);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const [showText, setShowText] = useState(true);
	const checkout = useRecoilValue(walletAddress);

	const sampleText = checkout.userWalletAddress;

	const navigation = useNavigation();
	const [modalVisible, setModalVisible] = useState(false);
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
			.post("/user/wallet/check", {
				userWalletPw: password,
			})
			.then((data) => {
				console.log("data.data.data: ", data.data.data);
				setModalVisible(true);
				// navigation.navigate("Main");
			})
			.catch((err) => {
				console.log("errdpfjs에러니?: ", err.response);
			});
	};

	return (
		<>
			<>
				<CommonLayout>
					<ColorHeader title="주소 관리" />

					<CustomText
						mainText="여러분의"
						emphasizedText="개인키"
						emphasizedColor="#70C8EE"
						finalText="를 확인할 수 있습니다."
					/>

					<View style={PrivateKeyLayout.submainContainer}>
						<View style={PrivateKeyLayout.banContainer}>
							<View style={PrivateKeyLayout.banMainCenter}>
								<View style={PrivateKeyLayout.banMain}>
									<Image source={redEye} />
									<Text style={PrivateKeyLayout.banMainText}>절대 금지</Text>
								</View>
								<View style={PrivateKeyLayout.banContent}>
									<Text style={PrivateKeyLayout.banContentText}>
										이 키를 절대 다르사람에게 공개하지 마세요. 개인키를 가지고
										있는 사람은 누구든 해당 지갑을 완전히 통제할 수 있습니다.
									</Text>
								</View>
							</View>
						</View>
					</View>

					<View style={PrivateKeyLayout.container}>
						<View style={PrivateKeyLayout.KeyContainer}>
							<TouchableOpacity onPress={() => setShowText(true)}>
								<View style={PrivateKeyLayout.BtnWidth}>
									<Text
										style={[
											PrivateKeyLayout.textKey,
											showText && PrivateKeyLayout.activeText,
										]}
									>
										텍스트
									</Text>
									{showText && <View style={PrivateKeyLayout.underline} />}
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowText(false)}>
								<View style={PrivateKeyLayout.BtnWidth}>
									<Text
										style={[
											PrivateKeyLayout.textKey,
											!showText && PrivateKeyLayout.activeText,
										]}
									>
										QR 코드
									</Text>
									{!showText && <View style={PrivateKeyLayout.underline} />}
								</View>
							</TouchableOpacity>
						</View>
						<View style={PrivateKeyLayout.PKcode}>
							{showText ? (
								<View style={PrivateKeyLayout.textContainer}>
									<View style={PrivateKeyLayout.textBorder}>
										<View style={PrivateKeyLayout.textMargin}>
											<Text style={PrivateKeyLayout.text}>{myPrivateKey}</Text>
										</View>
									</View>
								</View>
							) : (
								<View style={PrivateKeyLayout.QRimage}>
									<QRCode value={myPrivateKey} size={200} />
								</View>
							)}
						</View>
					</View>
					<CustomButton
						text="지갑주소 복사하기"
						color={"#70C8EE"}
						onPress={() => copyToClipboard()}
					/>
				</CommonLayout>

				<ModalPrivateKey
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
				<AbsoluteVar />
			</>
		</>
	);
};

export default Profile;
