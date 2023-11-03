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
import closeIcon from "../../assets/images/close-icon.png";
import { useNavigation } from "@react-navigation/native";

const ModalPrivateKey = ({ modalVisible, setModalVisible }: any) => {
	const navigation = useNavigation();

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
						<View>
							<TouchableOpacity
								style={styles.xImg}
								onPress={() => setModalVisible(false)}
							>
								<Image source={closeIcon} />
							</TouchableOpacity>
						</View>
						<Text style={styles.modalText}>
							개인키 정보를 안전하게 보관하세요
						</Text>

						<View style={styles.modalContent}>
							<Text style={styles.modalContentText}>
								당신의 개인키로
								<Text style={styles.modalContentBoldText}>
									계정과 자금을 완전히 엑세스
								</Text>
								할 수 있습니다.
								{"\n"}
								{"\n"}이 정보를 아무에게도 알려주지 마세요.
								{"\n"}
								{"\n"}
								<Text style={styles.modalContentBoldRedText}>
									정보를 요구하는 경우 피싱 사기일 수 있습니다.
								</Text>
							</Text>
						</View>
						<TouchableOpacity
							style={[styles.button, styles.buttonClose]}
							onPress={() => {
								setModalVisible(!modalVisible);
								navigation.navigate("PrivateKey");
							}}
						>
							<Text style={styles.textStyle}>눌러서 개인키 확인하기</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</>
	);
};

export default ModalPrivateKey;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)", // 이 부분이 모달 외부를 어둡게 합니다.
	},
	modalView: {
		position: "relative",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	xImg: {
		position: "absolute",
		top: 0,
		left: responsiveWidth(30),
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
		width: responsiveWidth(70),
		marginVertical: responsiveHeight(2),
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
});
