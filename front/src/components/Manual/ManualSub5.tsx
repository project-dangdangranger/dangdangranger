import { View, Text, StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const ManualSub5 = () => {
	return (
		<>
			<View style={styles.viewcontainer}>
				<Text style={styles.text1}>추후에 업데이트 될 예정입니다.</Text>
			</View>
		</>
	);
};

export default ManualSub5;

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
