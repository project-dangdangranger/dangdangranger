import { View, Text, StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const ManualSub4 = () => {
	return (
		<>
			<View style={styles.viewcontainer}>
				<Text style={styles.text1}>
					<Text style={styles.boldText}>네. </Text>순찰방범대원증은 영구적으로
					저장됩니다. 순찰방범대원증의 프로필 정보는 블록체인 기반 분산 저장소인
					<Text style={styles.boldText}> IPFS</Text>에 저장된 후 NFT로
					발급됩니다. 따라서 IPFS 네트워크가 유지되는한 영원히 저장될 것입니다.
					{"\n"}
					{"\n"}
					<Text style={styles.boldText}>IPFS란?</Text>
					{"\n"}
					IPFS 프로토콜은 대체로 빠르고 안전하며, 더욱 자유로운 인터넷 시스템
					구축이 가능합니다. 또한 업로드 및 다운로드 속도가 빠르며, 백본과
					<Text style={styles.boldText}> 중앙서버에 의존하지 않기 </Text> 때문에
					보안과 데이터에 대해서 모니터링을 할 수 없고 데이터 복사와 변조 또한
					불가능합니다.
				</Text>
			</View>
		</>
	);
};

export default ManualSub4;

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
