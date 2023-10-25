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
import Dog1 from "../../assets/images/yoonNft01.jpg";

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

				<View style={MainLayout.randingButtonWrap}>
					<View style={MainLayout.traceWrap}>
						<View>
							<Image source={templogo} style={MainLayout.traceMainImg} />
						</View>
						<View style={MainLayout.traceInfo}>
							<Text style={MainLayout.traceTitle}>
								평생을 함께,{"\n"}
								<Text style={MainLayout.boldTraceInfo}>반려견의 흔적</Text>을
								{"\n"}
								남길 수 있다면
							</Text>
							<Text style={MainLayout.traceDesc}>
								내 반려견{" "}
								<Text style={MainLayout.boldTraceDesc}>프로필 등록</Text>
								하셨나요?
								{"\n"}
								IDog에서 내 반려견의 정보를{"\n"}
								관리하세요.
							</Text>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => authHandling("Profile")}
							>
								<View style={MainLayout.createProfileButton}>
									<Text style={MainLayout.createProfileButtonText}>
										프로필 등록하기
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>

					<View style={MainLayout.tribeWrap}>
						<Image source={Dog1} style={MainLayout.tribeMainImg} />
						<View style={MainLayout.tribeInfoWrap}>
							<Text style={MainLayout.tribeTitle}>평생 행복하도록.</Text>
							<Text style={MainLayout.tribeDesc}>
								반려견과 함께했던 모든 추억이 잊혀지지 않고{"\n"}
								기억될 수 있도록 온라인 하늘공원에서 관리해드려요
							</Text>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => authHandling("Three")}
							>
								<View style={MainLayout.moveTribeButton}>
									<Text style={MainLayout.moveTribeButtonText}>
										온라인 하늘공원 둘러보기
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>

					<View style={{ marginTop: responsiveHeight(5) }}></View>
					{LoginStore.isLogged ? (
						<Text style={MainLayout.randingTitle}>
							<Text style={MainLayout.boldRandingTitle}>
								IDog에서 이용가능한
							</Text>
							내 반려견 서비스
						</Text>
					) : (
						<Text style={MainLayout.randingTitle}>
							<Text style={MainLayout.boldRandingTitle}>
								로그인 이후 사용이 가능
							</Text>
							한 서비스입니다.
						</Text>
					)}

					<View style={MainLayout.flexButtonWrap}>
						<IconButton
							desc="반려견 평생소장"
							title="프로필 제작"
							iconImage={templogo}
							movePage="Profile"
						/>
						<IconButton
							desc="소중한 나의 개인정보"
							title="마이페이지"
							iconImage={templogo}
							movePage="MyPage"
						/>
					</View>
					<View style={MainLayout.flexButtonWrap}>
						<IconButton
							desc="간편한 소유권 증명"
							title="입양절차"
							iconImage={templogo}
							movePage="Adoption"
						/>
						<IconButton
							desc="포토앨범"
							title="사진첩"
							iconImage={templogo}
							movePage="Album"
						/>
					</View>
				</View>
				<Footer />
			</CommonLayout>
		</>
	);
};

export default Main;
