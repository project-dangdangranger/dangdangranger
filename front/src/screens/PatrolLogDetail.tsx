import { Image, Text, View } from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import patrolLogDetailLayout from "../styles/patrolLogDetailLayout";
import LogMapImg from "../../assets/images/log-map-img.png";
import LocIconImg from "../../assets/images/location-icon.png";
import DateIconImg from "../../assets/images/date-icon.png";
import DistanceIconImg from "../../assets/images/distance-icon.png";
import TimeIconImg from "../../assets/images/time-icon.png";

const PatrolLogDetail = () => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="순찰 상세 기록" />
				<View style={patrolLogDetailLayout.container}>
					<View style={patrolLogDetailLayout.imgWrap}>
						<Image source={LogMapImg} style={patrolLogDetailLayout.img} />
					</View>
					<View style={patrolLogDetailLayout.detailContainer}>
						<View style={patrolLogDetailLayout.btnRowWrap}>
							<View
								style={[
									patrolLogDetailLayout.btnWrap,
									patrolLogDetailLayout.locationWrap,
								]}
							>
								<Image
									source={LocIconImg}
									style={patrolLogDetailLayout.iconWrap}
								/>
								<Text style={patrolLogDetailLayout.textWrap}>
									서울특별시{"\n"}강남구 역삼동
								</Text>
							</View>
							<View
								style={[
									patrolLogDetailLayout.btnWrap,
									patrolLogDetailLayout.dateWrap,
								]}
							>
								<Image
									source={DateIconImg}
									style={patrolLogDetailLayout.iconWrap}
								/>
								<Text style={patrolLogDetailLayout.textWrap}>
									2022년{"\n"}11월 3일
								</Text>
							</View>
						</View>
						<View style={patrolLogDetailLayout.btnRowWrap}>
							<View
								style={[
									patrolLogDetailLayout.btnWrap,
									patrolLogDetailLayout.distanceWrap,
								]}
							>
								<Image
									source={DistanceIconImg}
									style={patrolLogDetailLayout.iconWrap}
								/>
								<Text style={patrolLogDetailLayout.textWrap}>1.5 Km</Text>
							</View>
							<View
								style={[
									patrolLogDetailLayout.btnWrap,
									patrolLogDetailLayout.timeWrap,
								]}
							>
								<Image
									source={TimeIconImg}
									style={patrolLogDetailLayout.iconWrap}
								/>
								<Text style={patrolLogDetailLayout.textWrap}>1.5 hr</Text>
							</View>
						</View>
					</View>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolLogDetail;
