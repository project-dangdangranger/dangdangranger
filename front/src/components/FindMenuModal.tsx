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

const FindMenuModal = ({ modalVisible, setModalVisible }: any) => {
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
						<View>
							{/* <CustomButton text="개인키 확인하기" onPress={AlertSubmit} /> */}
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
		position: "relative",
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
	},
	xImg: {
		position: "absolute",
		top: 0,
		left: responsiveWidth(25),
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
});
