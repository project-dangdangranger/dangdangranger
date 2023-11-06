import { useEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import CommonLayout from "../recycles/CommonLayout";

import WhiteHeader from "../recycles/WhiteHeader";
import ProfileLayout from "../styles/profileLayout";
import TempImg from "../../assets/images/templogo.png";
import Footer from "../recycles/Footer";
import ColorHeader from "../recycles/ColorHeader";
import AlbumLayout from "../styles/albumLayout";
import TempProfileImg from "../../assets/images/dog1.jpg";
import WhitePenIcon from "../../assets/images/pen-icon.png";
import FourBtn from "../recycles/PetrolBtn";
import AbsoluteVar from "../recycles/FooterBar";
import MainLayout from "../styles/mainLayout";
import CustomButton from "../recycles/CustomBtn";
import NFTImg from "../../assets/images/NFTImg.png";
import CustomText from "../recycles/CustomText";
import { responsiveHeight } from "react-native-responsive-dimensions";
import axios from "../utils/axios";
import WalletMine from "./WalletMine";
import { useRecoilState } from "recoil";
import { walletAddress } from "../atoms/atoms";

const Profile = ({ navigation }: any) => {
	const [checkWallet, setCheckWallet] = useState<boolean>(false);
	const [checkout, setCheckout] = useRecoilState(walletAddress);

	let hasWallet = false;

	useEffect(() => {
		axios
			.get("/user/wallet")
			.then((data) => {
				console.log("data.data.data: ", data.data.data);
				if (data.data.data != null) {
					hasWallet = true;
					setCheckWallet(true);
					setCheckout(data.data.data);
				} else {
					hasWallet = false;
					setCheckWallet(false);
				}
			})
			.catch((err) => {
				console.log("errdpfjs에러니?: ", err.response);
				hasWallet = false;
			});
	}, []);

	if (hasWallet) {
		console.log("생성:", hasWallet);
		console.log("월렛 주소:", checkout);
	}

	return (
		<>
			{!checkWallet ? (
				<>
					<CommonLayout>
						<ColorHeader title="주소 관리" />

						<CustomText
							mainText="지갑이 없습니다."
							emphasizedText="지갑"
							emphasizedColor="#3E6DCA"
							finalText="을 만들어주세요"
						/>

						<View style={styles.imgcontainer}>
							<Image source={NFTImg} />
						</View>
						<CustomButton
							text="지갑 발급하기"
							onPress={() => navigation.navigate("MakeWallet1")}
						/>
					</CommonLayout>
					<AbsoluteVar />
				</>
			) : (
				<WalletMine checkout={checkout} />
			)}
		</>
	);
};

export default Profile;

const styles = StyleSheet.create({
	imgcontainer: {
		justifyContent: "center",
		alignItems: "center",
		marginVertical: responsiveHeight(12),
	},
});
