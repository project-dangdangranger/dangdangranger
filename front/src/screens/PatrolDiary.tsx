import {
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
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

const PatrolDiary = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const [selectedOption, setSelectedOption] = useState("최신순");
	const patrolDiaryInfo = {
		nameid: "나노나누",
		location: "서울특별시 역삼동",
		title: "찾아주세요..제발..ㅇㅇㅇㅇㅇㅇㅇㅇ",
		writer: "나노나누",
		viewCount: "232",
		date: "2023.01.01",
	};
	const [patrolDiaryList, setPatrolDiaryList] = useState([]);

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
								<TouchableOpacity onPress={() => navigate("PatrolDiaryWrite")}>
									<Image
										source={dotIconImg}
										style={PatrolDiaryLayout.iconImg}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<TextInput
							style={PatrolDiaryLayout.formInput}
							onChangeText={() => {}}
							placeholder="실종견의 정보를 입력해주세요."
						/>
					</View>
					<View style={PatrolDiaryLayout.patrolRowWrap}>
						{patrolDiaryList?.map((patrolDiary) => {
							return (
								<PatrolDiaryCard
									imgSrc={{ uri: patrolDiary.patrolFirstImg }}
									patrolDiaryInfo={patrolDiary}
									key={patrolDiary.patrolNo}
								/>
							);
						})}
					</View>
				</View>
				<TouchableOpacity onPress={() => navigate("PatrolDiaryWrite")}>
					<Text>Hi</Text>
				</TouchableOpacity>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolDiary;
