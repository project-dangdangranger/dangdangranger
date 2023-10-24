import { Text, View, Image } from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import MainHeader from "../recycles/MainHeader";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import MainCount from "../components/MainCount";
import MainLayout from "../styles/mainLayout";
import Page from "../../assets/images/mainPage.png";

const Main = () => {
	return (
		<>
			<></>
			<CommonLayout>
				<MainHeader></MainHeader>
				<View style={MainLayout.walkMainWrap}>
					<MainCount />
					<Text style={MainLayout.walkMainTitle}>
						<Text style={MainLayout.walkBoldText}>댕댕레인저</Text>
						와 함께 {"\n"}
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
			</CommonLayout>
		</>
	);
};

export default Main;
