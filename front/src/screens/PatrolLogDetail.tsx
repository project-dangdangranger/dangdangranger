import { Image, Text, View } from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import patrolLogDetailLayout from "../styles/patrolLogDetailLayout";
import LogMapImg from "../../assets/images/log-map-img.png";

import debugImg from "../../assets/images/4btn-record-icon.png";

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
									source={debugImg}
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
									source={debugImg}
									style={patrolLogDetailLayout.iconWrap}
								/>
								<Text style={patrolLogDetailLayout.textWrap}>
									2022년 11월 3일
								</Text>
							</View>
						</View>
						<View
							style={[
								patrolLogDetailLayout.debug,
								patrolLogDetailLayout.btnRowWrap,
							]}
						>
							<View></View>
							<View></View>
						</View>
					</View>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolLogDetail;
