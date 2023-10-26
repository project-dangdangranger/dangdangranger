import { Text, View, Image, Alert, TouchableOpacity } from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import MainHeader from "../recycles/MainHeader";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import MainCount from "../components/MainCount";
import MainLayout from "../styles/mainLayout";
import Page from "../../assets/images/mainPage.png";
import CustomButton from "../recycles/CustomBtn";
import templogo from "../../assets/images/templogo.png";
import IconButton from "../recycles/IconButton";
import Footer from "../recycles/Footer";
import MissingDogImg from "../../assets/images/main-missing-banner.png";
import NFTSubImg from "../../assets/images/main-NFT.png";
import PatrolSubImg from "../../assets/images/main-patrol.png";
import MissingSubImg from "../../assets/images/main-missing.png";
import ChatBotSubImg from "../../assets/images/main-chatbot.png";
import FooterBar from "../recycles/FooterBar";

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
				<View style={MainLayout.walkMainWrap}>
					<MainCount />
					<Text style={MainLayout.walkMainTitle}>
						<Text style={MainLayout.walkBoldText}>댕댕레인저</Text>와 함께{" "}
						{"\n"}
						반려견과 지역의 안전을 위해{"\n"}
						순찰해보세요
					</Text>

					<Text style={MainLayout.walkMainDesc}>
						서비스 이름은 내 반려견의 프로필을 NFT화하여{"\n"}
						방범대원으로 활동할 수 있도록 도와주는 플랫폼입니다.
					</Text>
				</View>
				<View style={MainLayout.containerImg}>
					<Image source={Page} style={MainLayout.mainImg} />
				</View>
				<CustomButton
					text="지역 순찰하기"
					onPress={() => authHandling("Walk")}
				/>
				{LoginStore.isLogged ? null : (
					<View style={MainLayout.mainTextWrap}>
						<TouchableOpacity onPress={() => authHandling("Login연결해줘")}>
							<Text style={MainLayout.walkBoldText}>회원이 아니신가요?</Text>
						</TouchableOpacity>
					</View>
				)}

				<View style={MainLayout.randingButtonWrap}>
					<View style={MainLayout.traceWrap}>
						<View>
							<Image source={templogo} style={MainLayout.traceMainImg} />
						</View>
						<View style={MainLayout.traceInfo}>
							<Text style={MainLayout.traceTitle}>
								<Text style={MainLayout.boldTraceInfo}>반려견 순찰증</Text>
								{"\n"}
								반려견을 요원으로{"\n"}
								등록해보세요.
							</Text>
							<Text style={MainLayout.traceDesc}>
								내 반려견{"\n"}
								<Text style={MainLayout.boldTraceDesc}>방범대원증 등록</Text>
								하셨나요?
							</Text>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => authHandling("Profile")}
							>
								<View style={MainLayout.createProfileButton}>
									<Text style={MainLayout.createProfileButtonText}>
										대원 등록하기
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>

					<View style={MainLayout.tribeWrap}>
						<Image source={MissingDogImg} style={MainLayout.tribeMainImg} />
					</View>

					<View style={MainLayout.missingWrap}>
						<Text style={MainLayout.missingTitle}>
							<Text style={MainLayout.boldMisiingInfo}>
								실종견을 찾아주세요.
							</Text>
							{"\n"}
							우리 동네 사랑스러운 강아지를 찾아주세요.{"\n"}
							견주가 애타게 찾고 있습니다. 여러분의 선의로 실종견 찾기에
							참여해주세요.
						</Text>
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => authHandling("Profile")}
						>
							<View style={MainLayout.findMissingDogButton}>
								<Text style={MainLayout.findMissingDogButtonText}>
									우리동네 실종견 찾기
								</Text>
							</View>
						</TouchableOpacity>
					</View>

					<View style={MainLayout.serviceWrap}>
						<Text>
							<Text style={MainLayout.boldServiceText}>김싸피</Text> 님을 위한
							댕댕레인저 서비스
						</Text>
					</View>

					<View style={MainLayout.flexButtonWrap}>
						<IconButton
							desc="반려견 순찰증 NFT"
							title="대원증 제작"
							iconImage={NFTSubImg}
							movePage="NFT"
						/>
						<IconButton
							desc="대원 순찰 다이어리"
							title="순찰 기록"
							iconImage={PatrolSubImg}
							movePage="Patrol"
						/>
					</View>
					<View style={MainLayout.flexButtonWrap}>
						<IconButton
							desc="실종견 등록 & 찾기"
							title="실종견"
							iconImage={MissingSubImg}
							movePage="Missing"
						/>
						<IconButton
							desc="서비스 도우미"
							title="챗봇"
							iconImage={ChatBotSubImg}
							movePage="ChatBot"
						/>
					</View>
				</View>
				<Footer />
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default Main;
