import { View, Text, StyleSheet, Image } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import exImg from "../../../assets/images/photo-ex-img3.png";

const ManualSub1 = () => {
	return (
		<>
			<View style={styles.viewcontainer}>
				<Text style={styles.text1}>
					NFT란
					<Text style={styles.boldText}> "Non-Fungible Token" </Text>의 약자로,
					<Text style={styles.boldText}> '대체 불가능한 토큰'</Text>을
					의미합니다. 이는 디지털 자산의 독특함과 소유권을 보증하는 블록체인
					기반의 기술입니다.
					{"\n"}
					{"\n"}각 NFT는 고유한 정보와 속성을 가지고 있어서 다른 토큰과
					구별됩니다. 이러한 특성 때문에 예술 작품, 음악, 게임 아이템, 수집품 등
					다양한 디지털 콘텐츠를 대표하거나 소유권을 증명하는 데 사용됩니다.
					{"\n"}
					{"\n"}저희 ‘댕댕레인저’에서는 반려견의 프로필 정보를 활용하여
					<Text style={styles.boldText}> 순찰방범대원증을 NFT</Text>로
					생성합니다.
				</Text>
			</View>
			{/* <View style={styles.imgcontainer}>
				<Image source={exImg} style={styles.styleimg} />
			</View> */}
		</>
	);
};

export default ManualSub1;

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
