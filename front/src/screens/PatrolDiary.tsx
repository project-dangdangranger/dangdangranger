import { useRef } from "react";
import {
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Modal,
	StyleSheet,
} from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import img from "../../assets/images/dog-hi.png";
import PatrolDiaryLayout from "../styles/patrolDiaryLayout";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../App";
import CustomTextComponent from "../recycles/CustomText";
import RadioBtn from "../recycles/RadioBtn";
import { useEffect, useState } from "react";
import PatrolDiaryCard from "../components/PatrolDiaryCard";
import dotIconImg from "../../assets/images/3-dot-icon.png";
import axios from "../utils/axios";
import { responsiveHeight } from "react-native-responsive-dimensions";

const PatrolDiary = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const [selectedOption, setSelectedOption] = useState("내동네");
	const [patrolDiaryList, setPatrolDiaryList] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		if (selectedOption === "내일지") {
			axios
				.get("/patrol/mine")
				.then((res) => {
					if (res.data.message === "사용자의 순찰일지 리스트 조회 완료") {
						setPatrolDiaryList(res.data.data);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}

		if (selectedOption === "내동네") {
			axios
				.get("/patrol")
				.then((res) => {
					if (res.data.message === "모든 순찰일지 리스트 조회 완료") {
						setPatrolDiaryList(res.data.data);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [selectedOption]);

	const [isMenuVisible, setMenuVisible] = useState(false);
	const anchorRef = useRef();

	const menuOptions = [
		{ label: "글 작성하기", onPress: () => console.log("글 작성하기") },
		// 여기에 더 많은 옵션을 추가할 수 있습니다.
	];

	return (
		<>
			<CommonLayout>
				<ColorHeader title="순찰 일지" />
				<CustomTextComponent
					mainText="주변 방범 대원의"
					emphasizedText="순찰 기록"
					emphasizedColor="#70C8EE"
					finalText="을 확인해보세요"
				/>
				<View style={PatrolDiaryLayout.container}>
					<View style={PatrolDiaryLayout.headerWrap}>
						<Text>PATROL Service</Text>
						<View style={PatrolDiaryLayout.headerRowWrap}>
							<Text style={PatrolDiaryLayout.headerTextTitle}>순찰 일지</Text>
							<View style={PatrolDiaryLayout.radioWrap}>
								<RadioBtn
									label="내동네"
									selected={selectedOption === "내동네"}
									onPress={() => setSelectedOption("내동네")}
								/>
								<RadioBtn
									label="내일지"
									selected={selectedOption === "내일지"}
									onPress={() => setSelectedOption("내일지")}
								/>

								<TouchableOpacity
									style={PatrolDiaryLayout.settings}
									onPress={() => {
										setModalVisible(true);
										// navigate("PatrolDiaryWrite");
									}}
								>
									<Image
										source={dotIconImg}
										style={PatrolDiaryLayout.iconImg}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View>
							<TextInput
								style={PatrolDiaryLayout.formInput}
								onChangeText={() => {}}
								placeholder="실종견의 정보를 입력해주세요."
							/>
						</View>
					</View>

					<View style={PatrolDiaryLayout.patrolRowWrap}>
						{patrolDiaryList?.map((patrolDiary) => {
							return (
								<>
									<PatrolDiaryCard
										imgSrc={{ uri: patrolDiary.patrolFirstImg }}
										patrolDiaryInfo={patrolDiary}
										key={patrolDiary.patrolNo}
									/>
								</>
							);
						})}
					</View>
				</View>
				<TouchableOpacity
					onPress={() => navigate("PatrolDiaryWrite")}
				></TouchableOpacity>
			</CommonLayout>
			<FooterBar />
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<TouchableOpacity
					style={PatrolDiaryLayout.modalContainer}
					onPress={() => setModalVisible(false)}
				>
					<View style={PatrolDiaryLayout.modalView}>
						<TouchableOpacity
							style={PatrolDiaryLayout.modalItem}
							onPress={() => {
								navigate("PatrolDiaryWrite");
								setModalVisible(false);
							}}
						>
							<Text style={PatrolDiaryLayout.modalText}>글 작성하기</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</Modal>
		</>
	);
};

export default PatrolDiary;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 100,
	},
	button: {
		padding: 10,
		backgroundColor: "#DDDDDD",
	},
	buttonText: {
		fontSize: 24,
	},
	modalContainer: {
		flex: 1,
		top: responsiveHeight(26),
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "flex-start",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	modalItem: {
		// marginBottom: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	modalText: {
		fontSize: 10,
	},
});
