import { Image, ScrollView, Text, View } from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import img from "../../assets/images/dog-hi.png";
import PatrolDiaryLayout from "../styles/PatrolDiaryLayout";

const PatrolDiary = () => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="순찰 일지" />
				<View style={PatrolDiaryLayout.container}>
					<View style={PatrolDiaryLayout.titleWrap}>
						<Text style={PatrolDiaryLayout.titleText}>
							주변 방범 대원의{"\n"}
							<Text style={PatrolDiaryLayout.titleTextColored}>순찰 기록</Text>
							을 확인하세요
						</Text>
					</View>
					<View style={PatrolDiaryLayout.imgWrap}>
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
					</View>
				</View>
				<View style={[PatrolDiaryLayout.debug, PatrolDiaryLayout.container]}>
					<View></View>
					<ScrollView></ScrollView>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolDiary;
