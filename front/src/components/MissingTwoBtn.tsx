import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import Btn1 from "../../assets/images/pngwing_4.png";
import Btn2 from "../../assets/images/image_73.png";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../App";

const MissingTwoBtn = () => {
	const { navigate } = useNavigation<StackNavigation>();
	return (
		<>
			<View style={styles.container}>
				<View style={styles.fourbtncontainer}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigate("MissingFind")}
					>
						<Image source={Btn1} style={styles.btnImg} />
						<Text style={styles.btnText1}>실종견 찾기</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigate("Report")}
					>
						<Image source={Btn2} style={styles.btnImg} />
						<Text style={styles.btnText2}>실종견 등록</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default MissingTwoBtn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "red",
		marginHorizontal: responsiveWidth(10),
	},
	containerSubTitle: {
		fontWeight: "600",
	},
	containerTitle: {
		fontSize: 25,
		fontWeight: "900",
		color: "#000000",
	},
	fourbtncontainer: {
		marginTop: responsiveHeight(4),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: responsiveWidth(80),
		// height: responsiveWidth(60),
	},
	btn: {
		width: responsiveWidth(37),
		height: responsiveWidth(30),
		backgroundColor: "#fff",
		borderRadius: 20,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	btnImg: {},
	btnText1: {
		fontSize: 16,
		fontWeight: "900",
		color: "#FF6853",
		paddingTop: responsiveHeight(1),
	},
	btnText2: {
		fontSize: 16,
		fontWeight: "900",
		color: "#409EFE",
		paddingTop: responsiveHeight(1),
	},
	btnText3: {
		fontSize: 16,
		fontWeight: "900",
		color: "#6679B0",
		paddingTop: responsiveHeight(1),
	},
	btnText4: {
		fontSize: 16,
		fontWeight: "900",
		color: "#FFBE24",
		paddingTop: responsiveHeight(1),
	},
});
