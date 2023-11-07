import CommonLayout from "../../recycles/CommonLayout";
import ColorHeader from "../../recycles/ColorHeader";
import FourBtn from "../../recycles/PetrolFourBtn";
import AbsoluteBar from "../../recycles/FooterBar";
import Carousel from "../../recycles/MultiPicture";
import { View, Text, StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const ManualSub7 = () => {
	return (
		<>
			<View style={styles.viewcontainer}>
				<Text style={styles.text1}>
					디지털 지갑(Digital Wallet), 또는 전자 지갑(Electronic Wallet)은
					<Text style={styles.boldText}> 디지털 형태로 돈을 저장</Text>하고,
					온라인 상에서 다양한 금융 거래를 할 수 있게 해주는 전자적 서비스나
					소프트웨어 응용 프로그램입니다. 이는 실제 지갑에 현금, 신용카드, 개인
					신분증 등을 보관하는 것과 유사하게, 전자화폐, 신용카드 정보, 쿠폰,
					회원카드 정보 등을 디지털 형태로 저장하고 관리할 수 있게 해줍니다.
					디지털 지갑의 예시로{" "}
					<Text style={styles.boldText}> MetaMask(메타마스크)</Text>가 있습니다.
					{"\n"}저희{" "}
					<Text style={styles.boldText}>
						‘댕댕레인저’는 앱 내의 자체 지갑 기능
					</Text>
					을 가지고 있습니다.
				</Text>
			</View>
		</>
	);
};

export default ManualSub7;

const styles = StyleSheet.create({
	viewcontainer: {
		marginHorizontal: responsiveWidth(10),
		// backgroundColor: "red",
		borderWidth: 2,
		borderRadius: 10,
		borderColor: "#9D9D9D",
		padding: 20,
	},
	text1: {
		fontSize: 15,
	},
	boldText: {
		fontSize: 15,
		fontWeight: "bold",
		color: "black",
	},
	styleimg: {
		height: responsiveHeight(50),
		width: responsiveWidth(30),
	},
	imgcontainer: {
		justifyContent: "center",
		alignItems: "center",
	},
});
