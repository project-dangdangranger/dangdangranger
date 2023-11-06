import { Alert, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import icon from "../../assets/images/right-arrow-icon.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../App";

const DetailBtn = () => {
	const { navigate } = useNavigation<StackNavigation>();
	return (
		<>
			<TouchableOpacity
				style={style.btnWrap}
				onPress={() => navigate("PatrolLogDetail")}
			>
				<Text style={style.btnText}>Detail</Text>
				<Image source={icon} style={style.btnImg} />
			</TouchableOpacity>
		</>
	);
};

export default DetailBtn;

const style = StyleSheet.create({
	btnWrap: {
		backgroundColor: "black",
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
