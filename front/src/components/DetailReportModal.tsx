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

const DetailReportModal = ({
	modalVisible,
	setModalVisible,
	detailReportDog,
}: any) => {
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
								{detailReportDog.searchReportImages &&
									detailReportDog.searchReportImages.map((imageUrl: any) => (
										<Image
											source={{ uri: imageUrl }}
											style={styles.detailImg}
										/>
									))}
							</View>
							<View style={styles.missingInfo}>
								<Text style={styles.missingText}>
									{detailReportDog?.createDate.split("T")[0]}
									{"  "}
									{detailReportDog?.createDate.split("T")[1]}
								</Text>
							</View>
							<View style={styles.missingContainer}>
								<Text>{detailReportDog?.searchReportContent}dd</Text>
							</View>
						</ScrollView>
					</View>
					{/* <TouchableOpacity
						style={styles.xImg}
						onPress={() => setModalVisible(false)}
					>
						<Image source={closeIcon} />
						<Text>TEXTEXTXEXTXTEX</Text>  
					</TouchableOpacity> */}
				</View>
			</Modal>
		</>
	);
};

export default DetailReportModal;

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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: responsiveWidth(70),
		height: responsiveHeight(15),
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
