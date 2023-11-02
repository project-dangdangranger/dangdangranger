import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
// import GestureFlipView from "../components/GestureFlipView";
import CommonLayout from "../recycles/CommonLayout";
// import ProfileItem from "../components/ProfileItem";
// import NftProfile from "../components/NftProfile";

import WhiteHeader from "../recycles/WhiteHeader";
// import SubMain from "../components/SubMain";
// import SubMainImg from "../../assets/images/sub-main-bg.png";
// import rightArrowIcon from "../../assets/images/right-arrow.png";
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

import WalletProcess from "../components/WalletProcess";

import ProtectWalletLayout from "../styles/protectWalletLayout";

const Profile = ({ navigation }: any) => {
	const flipView = useRef<any>();
	const [dogList, setDogList] = useState<any>([]);

	const [clickStatus, setClickStatus] = useState<boolean>(false);
	const [mnemonic, setMnemonic] = useState<string>("");

	const showMnemonic = () => {
		// Clipboard.setString(mnemonic);
		// setClickStatus(true);
	};

	useEffect(() => {
		const getMnemonic = async () => {
			// const mnemonic = await SecureStore.getItemAsync("mnemonic");
			// console.log("mnemonic", mnemonic);
			// setMnemonic(String(mnemonic));
		};
		getMnemonic();
	}, []);
	return (
		<>
			<CommonLayout>
				<ColorHeader title="계정 설정" />
				<View style={ProtectWalletLayout.titleWrap}>
					<Text style={ProtectWalletLayout.mainTitle}>지갑을 보호하세요.</Text>
					<Text style={ProtectWalletLayout.subTitle}>
						다음을 저장해 지갑을 보호하세요. 비밀 복구 구문 해당 구문은 믿을 수
						있는 장소에 저장하세요.
					</Text>
				</View>

				<WalletProcess />

				<TouchableOpacity activeOpacity={0.7} onPress={() => showMnemonic()}>
					<View style={ProtectWalletLayout.newmonicWrap}>
						{clickStatus ? (
							<Text style={ProtectWalletLayout.newmonicContents}>
								{mnemonic?.split(" ")[0]}&nbsp;&nbsp;{mnemonic?.split(" ")[1]}
								&nbsp;&nbsp;{mnemonic?.split(" ")[2]}&nbsp;&nbsp;
								{mnemonic?.split(" ")[3]}
								{"\n"}
								{mnemonic?.split(" ")[4]}&nbsp;&nbsp;{mnemonic?.split(" ")[5]}
								&nbsp;&nbsp;{mnemonic?.split(" ")[6]}&nbsp;&nbsp;
								{mnemonic?.split(" ")[7]}
								{"\n"}
								{mnemonic?.split(" ")[8]}&nbsp;&nbsp;{mnemonic?.split(" ")[9]}
								&nbsp;&nbsp;{mnemonic?.split(" ")[10]}&nbsp;&nbsp;
								{mnemonic?.split(" ")[11]}
							</Text>
						) : (
							<Text style={ProtectWalletLayout.newmonicContents}>
								이 곳을 클릭하여 복구 구문을 확인하세요.
							</Text>
						)}
					</View>
				</TouchableOpacity>
				<View style={ProtectWalletLayout.newmonicInfoWrap}>
					<Text style={ProtectWalletLayout.newmonicInfoText}>
						이것은 앱이 잠겨 있거나 새 기기를 얻었을 때 지갑을 복구하는 유일한
						방법입니다. 안전한 곳에 보관해주세요.
					</Text>
				</View>

				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => navigation.navigate("Wallet")}
				>
					<View style={ProtectWalletLayout.createButton}>
						<Text style={ProtectWalletLayout.createButtonText}>
							계정 생성 완료
						</Text>
					</View>
				</TouchableOpacity>

				<Footer />
			</CommonLayout>
		</>
	);

	// return (
	// 	<>
	// 		<CommonLayout>
	// 			<ColorHeader title="주소 관리" />
	// 			<Text>지갑만들어주세요1</Text>
	// 			<CustomButton
	// 				text="월렛 4페이지 이동"
	// 				onPress={() => navigation.navigate("MakeWallet4")}
	// 			/>
	// 		</CommonLayout>
	// 		<AbsoluteVar />
	// 	</>
	// );
};

export default Profile;
