import {
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
} from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import PatrolDiaryWriteLayout from "../styles/patrolDiaryWriteLayout";

import img from "../../assets/images/debug-dog.png";
import PatrolLogCarousel from "../recycles/PatrolLogCarousel";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";
import CustomSubButton from "../recycles/CustomSubBtn";
import { useState } from "react";
import axios from "../utils/axios";
import { useNavigation } from "@react-navigation/native";

const PatrolDiaryWrite = () => {
	const navigation = useNavigation();

	const logs = [
		{ logNo: 0, imgSrc: img, date: "22-02-02" },
		{ logNo: 1, imgSrc: img, date: "22-02-02" },
		{ logNo: 2, imgSrc: img, date: "22-02-02" },
		{ logNo: 3, imgSrc: img, date: "22-02-02" },
		{ logNo: 4, imgSrc: img, date: "22-02-02" },
	];

	const [patrolReportTitle, setPatrolReportTitle] = useState("");
	const [patrolReportContent, setPatrolReportContent] = useState("");
	const [patrolReportImageList, setPatrolReportImageList] = useState([
		"https://dangdangranger.s3.ap-northeast-2.amazonaws.com/map_2023-11-03T07%3A02%3A19.564Z_1072956.png",
	]);
	const [patrolLogNo, setPatrolLogNo] = useState(1);

	const submitPatrolReport = () => {
		axios
			.post("/patrol", {
				patrolReportTitle: patrolReportTitle,
				patrolReportContent: patrolReportContent,
				patrolReportImageList: patrolReportImageList,
				patrolLogNo: patrolLogNo,
			})
			.then((res) => {
				console.log("성공:", res.data);
				if (res.data.message === "순찰일지 등록 성공") {
					Alert.alert("순찰일지 등록 성공", "순찰 일지 화면으로 이동합니다.");

					navigation.navigate("PatrolDiary");
				}
			})
			.catch((err) => {
				console.log("에러;", err);
			});
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="순찰 일지 작성" />
				<View style={PatrolDiaryWriteLayout.container}>
					<View style={PatrolDiaryWriteLayout.titleWrap}>
						<Text style={PatrolDiaryWriteLayout.titleText}>
							순찰 기록을 클릭해{"\n"}
							<Text style={PatrolDiaryWriteLayout.titleTextColored}>
								순찰 일지 작성
							</Text>
							을 해보세요
						</Text>
					</View>
					<View style={PatrolDiaryWriteLayout.logWrap}>
						<PatrolLogCarousel logs={logs} />
					</View>
					<View style={PatrolDiaryWriteLayout.formWrap}>
						<TouchableOpacity
							activeOpacity={0.7}
							// onPress={pickImage}
						>
							<View style={PatrolDiaryWriteLayout.imageUploadWrap}>
								<Image source={AddPlusIcon} />
								<Text>사진 등록하기</Text>
							</View>
						</TouchableOpacity>
						<TextInput
							style={PatrolDiaryWriteLayout.formInput}
							value={patrolReportTitle}
							onChangeText={(text) => setPatrolReportTitle(text)}
							placeholder="제목을 작성해주세요."
							onBlur={() => {}}
						/>

						<View>
							<Text style={PatrolDiaryWriteLayout.textAlign}>
								순찰 일지 내용 작성
							</Text>
						</View>
						<TextInput
							style={[
								PatrolDiaryWriteLayout.formInput,
								PatrolDiaryWriteLayout.textDesc,
							]}
							value={patrolReportContent}
							onChangeText={(text) => {
								setPatrolReportContent(text);
							}}
							placeholder="순찰 일지 내용을 작성해주세요."
							onBlur={() => {}}
						/>
						<CustomSubButton
							text={"순찰일지 기록하기"}
							onPress={() => {
								submitPatrolReport();
							}}
							color={"#70C8EE"}
						/>
					</View>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolDiaryWrite;
