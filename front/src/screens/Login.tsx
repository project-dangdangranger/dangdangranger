import { Text, View, Image, Alert, TouchableOpacity } from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import MainHeader from "../recycles/MainHeader";
import FooterBar from "../recycles/FooterBar";
import LoginImg from "../../assets/images/LoginImg.png";
import LoginLayout from "../styles/loginLayout";
import GoogleImg from "../../assets/images/Google.png";

const Main = ({ navigation }: any) => {
	const LoginStore = {
		isLogged: true,
	};

	const authHandling = (pageName: string) => {
		// if (LoginStore.isLogged) {
		Alert.alert("로그인 후 이용 가능합니다.");
		// } else {
		// alert("해당 서비스는 로그인 후 이용가능합니다.");
		// }
	};

	return (
		<>
			<></>
			<CommonLayout>
				<MainHeader></MainHeader>

				<View style={LoginLayout.textcontainer}>
					<Text style={LoginLayout.Text1}>로그인해주세요</Text>
					<Text style={LoginLayout.Text2}>
						구글 로그인으로 간편하게 로그인하세요
					</Text>
				</View>

				<View style={LoginLayout.containerImg}>
					<Image source={LoginImg} style={LoginLayout.Img1} />
				</View>

				<TouchableOpacity
					style={LoginLayout.BtnContainer}
					onPress={() => Alert.alert("로그인을 연결 부탁드릴께요")}
				>
					<View style={LoginLayout.LoginBtn}>
						<Image style={LoginLayout.btnImg} source={GoogleImg} />
						<Text style={LoginLayout.textBtn}>Connect with Google</Text>
					</View>
				</TouchableOpacity>
				<View style={LoginLayout.bottomText}>
					<Text style={LoginLayout.btnText}>
						로그인함으로써
						<Text style={LoginLayout.boldText}>
							{" "}
							개인정보 보호정책 및 개인정보 보호정책
						</Text>
						에 이용약관에 동의합니다
					</Text>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default Main;
