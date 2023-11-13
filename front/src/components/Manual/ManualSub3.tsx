import { View, Text, StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const ManualSub3 = () => {
	return (
		<>
			<View style={styles.viewcontainer}>
				<Text style={styles.text1}>NFT 만드는 방법 캡쳐해서 추가</Text>
			</View>
		</>
	);
};

export default ManualSub3;

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
