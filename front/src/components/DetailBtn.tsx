import { Alert, Image, StyleSheet, Text, View } from "react-native";
import icon from "../../assets/images/right-arrow-icon.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
// import { StackNavigation } from "../../App";

const DetailBtn = () => {
	return (
		<>
			<View style={style.btnWrap}>
				<Text style={style.btnText}>Detail</Text>
				<Image source={icon} style={style.btnImg} />
			</View>
		</>
	);
};

export default DetailBtn;

const style = StyleSheet.create({
	btnWrap: {
		backgroundColor: "#2B2B2B",
		borderRadius: 80,
		height: responsiveHeight(3.8),
		marginTop: -responsiveHeight(1),
		marginBottom: responsiveHeight(0.5),
		width: responsiveWidth(22),
		paddingHorizontal: responsiveWidth(1),
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	btnText: {
		color: "white",
		fontSize: 17,
		fontWeight: "900",
		marginLeft: responsiveWidth(2),
	},
	btnImg: {
		width: responsiveWidth(2),
		height: responsiveHeight(2),
		marginRight: responsiveWidth(3),
	},
});
