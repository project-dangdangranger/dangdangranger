import React, { useRef } from "react";
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
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { useFocusEffect } from "@react-navigation/native";

const PatrolDiary = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const [selectedOption, setSelectedOption] = useState("내일지");
	const [patrolDiaryList, setPatrolDiaryList] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	// 모달 설정
	const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
	const threedotRef = useRef(null);

	const handlePressThreedot = (event) => {
		event.preventDefault();
		threedotRef.current.measure((fx, fy, width, height, px, py) => {
			const x = px - responsiveWidth(64); // Horizontal position
			const y = py + height; // Vertical position, just below the button
			setModalPosition({ top: y, left: x });
			setModalVisible(!modalVisible); // Toggle visibility
		});
	};

	useFocusEffect(
		React.useCallback(() => {
			if (selectedOption === "내일지") {
				axios
					.get("/patrol/mine")
					.then((res) => {
						console.log("res.data : ", res.data);
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
							console.log(res.data);
							setPatrolDiaryList(res.data.data);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			}
		}, [selectedOption]),
	);

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
									ref={threedotRef}
									style={PatrolDiaryLayout.settings}
									onPress={handlePressThreedot}
								>
									<Image
										source={dotIconImg}
										style={PatrolDiaryLayout.iconImg}
									/>
								</TouchableOpacity>
							</View>
						</View>

						{/* <View>
							<TextInput
								style={PatrolDiaryLayout.formInput}
								onChangeText={() => {}}
								placeholder="순찰일지 정보를 입력해주세요."
							/>
						</View> */}
					</View>

					<View style={PatrolDiaryLayout.patrolRowWrap}>
						{patrolDiaryList.length ? (
							patrolDiaryList.map((patrolDiary) => {
								return (
									<>
										<PatrolDiaryCard
											imgSrc={{ uri: patrolDiary.patrolFirstImg }}
											patrolDiaryInfo={patrolDiary}
											key={patrolDiary.patrolNo}
										/>
									</>
								);
							})
						) : (
							<View>
								<Text>순찰일지가 없습니다.</Text>
							</View>
						)}
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
					style={styles.modalbg}
					onPress={() => setModalVisible(false)}
				>
					<TouchableOpacity
						style={[
							styles.modalItem,
							{ top: modalPosition.top, left: modalPosition.left },
						]}
						onPress={() => {
							navigate("PatrolDiaryWrite");
							setModalVisible(false);
						}}
					>
						<View style={styles.modalView}>
							<Text style={PatrolDiaryLayout.modalText}>글 작성하기</Text>
						</View>
					</TouchableOpacity>
				</TouchableOpacity>
			</Modal>
		</>
	);
};

export default PatrolDiary;

const styles = StyleSheet.create({
	modalbg: {
		flex: 1,
	},
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
		position: "absolute",
		// flex: 1,
		// height: responsiveHeight(200),
		backgroundColor: "rgba(0,0,0,0.5)",
		// paddingTop: 300,
	},
	modalView: {
		backgroundColor: "white",
		borderRadius: 20,
		paddingHorizontal: 35,
		paddingVertical: 15,
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
