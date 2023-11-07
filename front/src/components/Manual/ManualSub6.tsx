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

const ManualSub6 = () => {
	return (
		<>
			<View style={styles.viewcontainer}>
				<Text style={styles.text1}>
					강아지{" "}
					<Text style={styles.boldText}>
						비문 인식(Dog Noseprint Recognition){" "}
					</Text>
					은 강아지의 코에 있는 독특한 패턴을 이용해 개체를 식별하는 기술입니다.
					사람의 지문과 유사하게,{" "}
					<Text style={styles.boldText}>강아지의 코 패턴은 각각 고유하며</Text>,
					이 패턴을 통해 각각의 개를 정확히 식별할 수 있습니다.
					{"\n"}이 기술은 주로 애완동물의 식별, 분실 예방 및 찾기, 보호소 관리,
					유전학 연구 등에 사용됩니다.
				</Text>
			</View>
		</>
	);
};

export default ManualSub6;

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
