import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import Btn1 from "../../assets/images/4btn-patrol-icon.png";
import Btn2 from "../../assets/images/4btn-graph-icon.png";
import Btn3 from "../../assets/images/4btn-log-icon.png";
import Btn4 from "../../assets/images/4btn-record-icon.png";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../App";

const FourBtn = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const authHandling = (pageName: string) => {
		navigate(pageName);
	};
	return (
		<>
			<View style={styles.container}>
				<Text style={styles.containerSubTitle}>PETROL Service</Text>
				<Text style={styles.containerTitle}>순찰 관리</Text>
				<View style={styles.fourbtncontainer}>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => navigate("PatrolGo")}
					>
						<Image source={Btn1} style={styles.btnImg} />
						<Text style={styles.btnText1}>순찰</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={() => navigate("")}>
						<Image source={Btn2} style={styles.btnImg} />
						<Text style={styles.btnText2}>순찰 통계</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.fourbtncontainer}>
					<TouchableOpacity style={styles.btn} onPress={() => navigate("")}>
						<Image source={Btn3} style={styles.btnImg} />
						<Text style={styles.btnText3}>순찰 로그</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={() => navigate("")}>
						<Image source={Btn4} style={styles.btnImg} />
						<Text style={styles.btnText4}>순찰 일지</Text>
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
		marginTop: responsiveHeight(5),
		fontWeight: "600",
	},
	containerTitle: {
		fontSize: 25,
		fontWeight: "900",
		color: "#000000",
	},
	fourbtncontainer: {
		marginTop: responsiveHeight(2),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: responsiveWidth(80),
		// height: responsiveWidth(60),
	},
	btn: {
		width: responsiveWidth(38),
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
