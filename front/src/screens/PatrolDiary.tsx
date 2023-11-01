import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import img from "../../assets/images/dog-hi.png";
import PatrolDiaryLayout from "../styles/patrolDiaryLayout";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../App";
import CustomTextComponent from "../recycles/CustomText";
import RadioBtn from "../recycles/RadioBtn";
import { useState } from "react";

const PatrolDiary = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const [selectedOption, setSelectedOption] = useState("최신순");
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
				{/*<View style={PatrolDiaryLayout.imgWrap}>
						<Image source={img} style={PatrolDiaryLayout.img} />
						<Text
							style={[PatrolDiaryLayout.imgText, PatrolDiaryLayout.imgAddrText]}
						>
							서울특별시, 역삼동
						</Text>
						<Text
							style={[PatrolDiaryLayout.imgText, PatrolDiaryLayout.imgHitText]}
						>
							조회수 111
						</Text>
	</View>*/}
				<View style={PatrolDiaryLayout.container}>
					<View style={PatrolDiaryLayout.headerWrap}>
						<Text>PATROL Service</Text>
						<View style={PatrolDiaryLayout.headerRowWrap}>
							<Text style={PatrolDiaryLayout.headerTextTitle}>순찰 일지</Text>
							<View style={PatrolDiaryLayout.radioWrap}>
								<RadioBtn
									label="최신순"
									selected={selectedOption === "최신순"}
									onPress={() => setSelectedOption("최신순")}
								/>
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
							</View>
						</View>
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
