import {
	Modal,
	Text,
	TouchableOpacity,
	View,
	Image,
	Alert,
	StyleSheet,
	ScrollView,
} from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

import closeIcon from "../../assets/images/close-icon.png";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import maleIcon from "../../assets/images/modal-male-icon.png";
import femaleIcon from "../../assets/images/modal-female-icon.png";

const DetailModal = ({
	modalVisible,
	setModalVisible,
	missingInfo,
	dogInfo,
}: any) => {
	const calculateAge = (dogBirth: any) => {
		const currentDate = new Date();
		console.log("오늘 날짜: ", currentDate);

		const birth = new Date(dogBirth);
		console.log("강아지 생일 : ", birth);

		let ageYears = currentDate.getFullYear() - birth.getFullYear();
		let ageMonths = currentDate.getMonth() - birth.getMonth();

		if (
			currentDate.getDate() < birth.getDate() ||
			currentDate.getDate() === birth.getDate()
		) {
			ageMonths--;
		}

		// 생일이 지났을 경우 1살 추가
		if (
			currentDate.getFullYear() < birth.getFullYear() &&
			currentDate.getMonth() >= birth.getMonth() &&
			currentDate.getDate() >= birth.getDate()
		) {
			ageYears++;
		}

		if (ageYears >= 1) {
			return `${ageYears}세`;
		} else {
			return `${ageMonths}개월`;
		}
	};

	const age = calculateAge(dogInfo.dogBirth);
	return (
		<>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<TouchableOpacity
							style={styles.xImg}
							onPress={() => setModalVisible(false)}
						>
							<Image source={closeIcon} />
						</TouchableOpacity>
						<ScrollView style={styles.contentContainer}>
							<View style={styles.detailContainer}>
								{missingInfo.missingImages && missingInfo.missingImages.map((imageUrl) => (<Image
									source={{ uri: imageUrl }}
									style={styles.detailImg}
								/>))}
							</View>
							<View style={styles.detailTextWrap}>
								<Text style={[styles.detailText, styles.detailTitle]}>
									{dogInfo?.dogName}
								</Text>
								<View style={{ flexDirection: "row", alignItems: "center" }}>
									<Image
										source={dogInfo.dogSex == "M" ? maleIcon : femaleIcon}
										style={styles.sexImg}
									/>
									<Text style={styles.detailText}>{dogInfo?.dogBreed}</Text>
								</View>
								<Text style={styles.detailText}>{age}</Text>
							</View>
							<View style={styles.missingInfo}>
								<Text
									numberOfLines={1}
									ellipsizeMode="tail"
									style={styles.missingText}
								>
									{missingInfo?.missingAddress}
								</Text>
								<Text style={styles.missingText}>
									{missingInfo?.missingDate}
								</Text>
							</View>
							<View style={styles.missingContainer}>
								<Text>{missingInfo?.missingContent}</Text>
							</View>
						</ScrollView>
						<TouchableOpacity
							style={styles.btnContainer}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.btnText}>같이 찾기</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default DetailModal;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)", // 이 부분이 모달 외부를 어둡게 합니다.
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 25,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		height: responsiveHeight(50),
		width: responsiveWidth(80),
	},
	xImg: {
		position: "absolute",
		top: 15,
		right: 15,
	},

	contentContainer: {
		width: responsiveWidth(70),
		height: responsiveHeight(45),
	},
	detailContainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		width: responsiveWidth(70),
		// height: responsiveHeight(15),
		marginVertical: responsiveHeight(1.5),
	},
	detailImg: {
		width: responsiveWidth(35),
		height: responsiveHeight(20),
		resizeMode: "contain",
	},
	detailTextWrap: {
		width: responsiveWidth(35),
		height: responsiveHeight(20),
		justifyContent: "center",
		paddingLeft: responsiveWidth(5),
	},
	detailTitle: {
		fontSize: 20,
	},
	detailText: {
		marginVertical: responsiveHeight(1),
		color: "black",
		fontWeight: "bold",
		fontSize: 15,
	},
	sexImg: {
		width: 20,
		height: 20,
	},
	missingInfo: {
		width: responsiveWidth(70),
		height: responsiveHeight(6),
	},
	missingText: {
		color: "black",
		fontWeight: "bold",
		fontSize: 15,
	},
	missingContainer: {
		width: responsiveWidth(70),
		height: responsiveHeight(15),
		borderRadius: 20,
		borderColor: "#eb9534",
		borderWidth: 1,
		marginVertical: responsiveHeight(1),
		paddingHorizontal: responsiveWidth(1),
		paddingVertical: responsiveHeight(1),
	},
	btnContainer: {
		backgroundColor: "#3D6CC9",
		borderRadius: 30,
		width: responsiveWidth(65),
		height: responsiveHeight(5),
		justifyContent: "center",
		alignItems: "center",
	},
	btnText: {
		color: "white",
		fontWeight: "bold",
	},
});
