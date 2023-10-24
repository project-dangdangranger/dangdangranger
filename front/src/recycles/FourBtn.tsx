import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import Btn1 from "../../assets/images/btn1.png";
import Btn2 from "../../assets/images/btn2.png";
import Btn3 from "../../assets/images/btn3.png";
import Btn4 from "../../assets/images/btn4.png";

const FourBtn = ({ navigation }: any) => {
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.containerSubTitle}>나의 프로필</Text>
				<Text style={styles.containerTitle}>프로필 관리</Text>
				<View style={styles.fourbtncontainer}>
					<TouchableOpacity style={styles.btn}>
						<Image source={Btn1} style={styles.btnImg} />
						<Text style={styles.btnText1}>강아지 관리</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn}>
						<Image source={Btn2} style={styles.btnImg} />
						<Text style={styles.btnText2}>프로필 관리</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.fourbtncontainer}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigation.navigate("Wallet")}
					>
						<Image source={Btn3} style={styles.btnImg} />
						<Text style={styles.btnText3}>지갑 주소</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn}>
						<Image source={Btn4} style={styles.btnImg} />
						<Text style={styles.btnText4}>내가 쓴 글</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default FourBtn;

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
