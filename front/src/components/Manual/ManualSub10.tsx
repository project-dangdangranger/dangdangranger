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

const ManualSub10 = () => {
	return (
		<>
			<View style={styles.viewcontainer}>
				<Text style={styles.text1}>
					<Text style={styles.boldText}>폴리곤 네트워크(Polygon Network)</Text>
					는 이더리움 블록체인을 보완하는 프레임워크 및 프로토콜 모음으로, 원래
					이름은 '매틱 네트워크(Matic Network)'였습니다. 이더리움의 주요
					문제점인 확장성, 높은 수수료, 낮은 거래 처리 속도를 해결하기 위해
					개발되었습니다. 폴리곤은 여러 스케일링 솔루션을 제공함으로써, 블록체인
					네트워크의 용량을 확장하고 사용자들에게 더 빠르고 저렴한 거래 경험을
					제공합니다.
				</Text>
			</View>
		</>
	);
};

export default ManualSub10;

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
