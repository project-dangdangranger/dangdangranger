import { Image, Text, View, ScrollView } from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import LogMapImg from "../../assets/images/log-map-img.png";
import PatrolLogLayout from "../styles/patrolLogLayout";
import { responsiveWidth } from "react-native-responsive-dimensions";
import img from "../../assets/images/debug-dog.png";
import DetailBtn from "../components/DetailBtn";

const PatrolLog = () => {
	const logs = [
		{ logNo: 0, imgSrc: img, date: "22-02-02" },
		{ logNo: 1, imgSrc: img, date: "22-02-02" },
		{ logNo: 2, imgSrc: img, date: "22-02-02" },
		{ logNo: 3, imgSrc: img, date: "22-02-02" },
		{ logNo: 4, imgSrc: img, date: "22-02-02" },
	];

	return (
		<>
			<CommonLayout>
				<ColorHeader title="내 순찰 기록" />
				<Image source={LogMapImg} style={PatrolLogLayout.imgWrap} />
				<View style={PatrolLogLayout.textWrap}>
					<Text style={PatrolLogLayout.textTitle}>내 순찰 기록</Text>
					<Text style={PatrolLogLayout.textDate}>23.10.09 ~ 23.10.16</Text>
				</View>
				<View style={PatrolLogLayout.scrollWrap}>
					<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
						{logs.map((log, index) => {
							return (
								<View key={log.logNo} style={PatrolLogLayout.cardWrap}>
									<Image source={log.imgSrc} style={PatrolLogLayout.cardImg} />
									<Text style={PatrolLogLayout.cardTextDate}>{log.date}</Text>
									<DetailBtn />
								</View>
							);
						})}
					</ScrollView>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolLog;
