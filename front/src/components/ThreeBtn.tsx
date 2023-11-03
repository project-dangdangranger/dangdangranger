import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	Alert,
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
import Sound from "react-native-sound";
import React, { useState } from "react";
// import sound from "../../assets/sounds/sound.mp3";

const ThreeBtn = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const authHandling = (pageName: string) => {
		navigate(pageName);
	};

	const alertSound = new Sound("sound.mp3", Sound.MAIN_BUNDLE, (error) => {
		console.log("sound error!! ", error);
		return;
	});

	// const [sirenOn, setSirenOn] = useState(false);

	const siren = () => {
		// Alert.alert("삐뽀삐뽀");
		// if (sirenOn) {
		// 	alertSound.stop(() => {
		// 		console.log("사이렌 off!");
		// 		setSirenOn(false);
		// 	});
		// } else {
		// 	alertSound.stop(() => {
		// 		console.log("사이렌 on!");
		// 		alertSound.play();
		// 		setSirenOn(true);
		// 	});
		// }

		alertSound.play((success) => {
			if (success) {
				console.log("successfully finished playing");
			} else {
				console.log("playback failed due to audio decoding errors");
			}
		});
	};

	const callPolice = () => {
		Alert.alert("네 112입니다. 무엇을 도와드릴까요?");
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
