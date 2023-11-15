import {
	Modal,
	Text,
	TouchableOpacity,
	View,
	Image,
	Alert,
	StyleSheet,
} from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";

import closeIcon from "../../assets/images/close-icon.png";
import modalIcon1 from "../../assets/images/modal-info-icon.png";
import modalIcon2 from "../../assets/images/modal-quit-icon.png";
import modalIcon3 from "../../assets/images/modal-board-icon.png";
import modalIcon4 from "../../assets/images/modal-siren-icon.png";

const FindMenuModal = ({
	modalVisible,
	setModalVisible,
	endSession,
	disabled,
	setMissingModal,
	disconnectServer,
}: any) => {
	const navigation = useNavigation();

	const showMisiingDetail = () => {
		setModalVisible(!setModalVisible);
		setMissingModal(true);
	};

	const showReports = () => {
		setModalVisible(!setModalVisible);
		Alert.alert("신고 현황이 표시될 거에요");
	};

	const writeReport = () => {
		setModalVisible(!setModalVisible);
		endSession();
	};

	const quitFinding = () => {
		setModalVisible(!setModalVisible);
		disconnectServer();
	};
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
						<View style={styles.componentContainer}>
							<TouchableOpacity
								style={styles.modalComponent}
								onPress={showMisiingDetail}
							>
								<Image source={modalIcon1} style={styles.modalImg} />
								<Text style={styles.modalTextDesc}>실종견 상세보기</Text>
							</TouchableOpacity>
							<TouchableOpacity
								disabled={disabled}
								style={[styles.modalComponent, disabled && styles.disabled]}
								onPress={showReports}
							>
								<Image source={modalIcon3} style={styles.modalImg} />
								<Text style={styles.modalTextDesc}>찾기 현황</Text>
							</TouchableOpacity>
							<TouchableOpacity
								disabled={disabled}
								style={[styles.modalComponent, disabled && styles.disabled]}
								onPress={writeReport}
							>
								<Image source={modalIcon4} style={styles.modalImg} />
								<Text style={styles.modalTextDesc}>신고하기</Text>
							</TouchableOpacity>
							<TouchableOpacity
								disabled={disabled}
								style={[styles.modalComponent, disabled && styles.disabled]}
								onPress={quitFinding}
							>
								<Image source={modalIcon2} style={styles.modalImg} />
								<Text style={styles.modalTextDesc}>함께 찾기 종료</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default FindMenuModal;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)", // 이 부분이 모달 외부를 어둡게 합니다.
	},
	modalView: {
		position: "absolute",
		bottom: responsiveHeight(30),
		right: responsiveWidth(8),
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
		height: responsiveHeight(30),
		width: responsiveWidth(50),
	},
	xImg: {
		position: "absolute",
		top: 15,
		right: 15,
	},
	disabled: {
		opacity: 0.5,
	},
	button: {
		width: responsiveWidth(70),
		justifyContent: "center",
		borderRadius: 30,
		padding: 10,
		elevation: 2,
	},
	buttonClose: {
		backgroundColor: "#3D6CC9",
		// alignItems: "center",
		// justifyContent: "center",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",

		fontSize: 20,
	},
	modalText: {
		marginBottom: 20,
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	modalContent: {
		width: responsiveWidth(50),
		marginVertical: responsiveHeight(6),
	},
	modalContentText: {
		fontSize: 14,
		// fontWeight: "bold",
	},
	modalContentBoldText: {
		fontSize: 14,
		fontWeight: "bold",
	},

	modalContentBoldRedText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#E30E0E",
	},

	componentContainer: {
		paddingVertical: responsiveHeight(2),
		width: responsiveWidth(40),
		height: responsiveHeight(25),
	},

	modalComponent: {
		flexDirection: "row",
		justifyContent: "flex-start",
		// alignItems: "flex-start",
		marginVertical: responsiveHeight(1),
	},

	modalImg: {
		width: 30,
		height: 30,
		marginHorizontal: responsiveWidth(1),
	},
	modalTextDesc: {
		color: "black",
		fontSize: 18,
		fontWeight: "bold",
		marginHorizontal: responsiveWidth(1),
	},
});
