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

const ManualSub2 = () => {
	return (
		<>
			<View style={styles.viewcontainer}>
				<Text style={styles.text1}>
					동네를 산책하며 우리동네를 안전하게 만들기 위한{" "}
					<Text style={styles.boldText}>주민 참여형 방범순찰대</Text>
					입니다. 안전한 우리 동네를 만들며 방범대원(반려견)이 실종되면 함께
					찾아주며 사람과 반려견 모두에게 안전하고 행복한 사회를 만들어나가는
					일을 합니다.
				</Text>
			</View>
		</>
	);
};

export default ManualSub2;

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
