import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Linking,
} from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import Btn1 from "../../assets/images/3btn-report-icon.png";
import Btn2 from "../../assets/images/3btn-siren-icon.png";
import Btn3 from "../../assets/images/3btn-call-icon.png";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../App";
import React, { useState } from "react";
import { NativeModules } from "react-native";

const { KakaoMapModule } = NativeModules;
const ThreeBtn = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const authHandling = (pageName: string) => {
		navigate(pageName);
	};
	const [sirenOn, setSirenOn] = useState(false);

	const siren = () => {
		if (sirenOn) {
			setSirenOn(false);
			KakaoMapModule.stopSound();
		} else {
			setSirenOn(true);
			KakaoMapModule.playSound();
		}
	};

	const callPolice = () => {
		//전화걸기 -> 112 입력된 채로 넘어가기
		Linking.openURL(`tel:112`);
	};

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.containerSubTitle}>REPORT Service</Text>
				<Text style={styles.containerTitle}>신고하기</Text>
				<View style={{ alignItems: "center" }}>
					<View style={styles.threebtncontainer}>
						<View style={styles.btncontainer}>
							<TouchableOpacity
								style={[styles.btn, styles.btn1]}
								onPress={() => navigate("Report")}
							>
								<Image source={Btn1} style={styles.btnImg} />
							</TouchableOpacity>
							<Text style={styles.btnTextTitle}>신고 등록</Text>
							<Text style={styles.btnTextDesc}>주의 사항을 알리세요</Text>
						</View>
						<View style={styles.btncontainer}>
							<TouchableOpacity
								style={[styles.btn, styles.btn2]}
								onPress={() => siren()}
							>
								<Image source={Btn2} style={styles.btnImg} />
							</TouchableOpacity>
							<Text style={styles.btnTextTitle}>사이렌</Text>
							<Text style={styles.btnTextDesc}>위급사항을 주변에 알리세요</Text>
						</View>
						<View style={styles.btncontainer}>
							<TouchableOpacity
								style={[styles.btn, styles.btn3]}
								onPress={() => callPolice()}
							>
								<Image source={Btn3} style={styles.btnImg} />
							</TouchableOpacity>
							<Text style={styles.btnTextTitle}>긴급 상황 신고</Text>
							<Text style={styles.btnTextDesc}>
								3초간 눌러 경찰에 신고하세요
							</Text>
						</View>
					</View>
				</View>
			</View>
		</>
	);
};

export default ThreeBtn;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "red",
		marginHorizontal: responsiveWidth(10),
		marginTop: -responsiveHeight(10),
		//alignItems: "center",
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
	threebtncontainer: {
		marginTop: responsiveHeight(2),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: responsiveWidth(83),
		// height: responsiveWidth(60),
	},

	btncontainer: {
		justifyContent: "center",
		alignItems: "center",
	},
	btn: {
		width: responsiveWidth(27),
		height: responsiveWidth(30),
		borderRadius: 20,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	btn1: {
		backgroundColor: "#F9DBD8",
	},
	btn2: {
		backgroundColor: "#FDF5EF",
	},
	btn3: {
		backgroundColor: "#E7E7F4",
	},

	btnImg: {},

	btnTextWrap: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: responsiveHeight(1),
	},
	btnTextTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#495058",
	},
	btnTextDesc: {
		fontSize: 10,
		fontWeight: "500",
		color: "#62656A",
		paddingHorizontal: responsiveWidth(1),
	},
});
