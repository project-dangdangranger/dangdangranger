import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import DetailBtn from "../components/DetailBtn";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const PatrolLogCarousel = ({ logs }: any) => {
	return (
		<>
			<View style={style.scrollWrap}>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
					{logs.map((log: any, index: any) => {
						return (
							<View key={log.logNo} style={style.cardWrap}>
								<Image source={log.imgSrc} style={style.cardImg} />
								<Text style={style.cardTextDate}>{log.date}</Text>
								<DetailBtn />
							</View>
						);
					})}
				</ScrollView>
			</View>
		</>
	);
};

export default PatrolLogCarousel;

const style = StyleSheet.create({
	scrollWrap: {
		height: responsiveHeight(24),
		width: "100%",
	},
	cardWrap: {
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderRadius: 10,
		elevation: 5,
		width: responsiveWidth(37),
		marginHorizontal: responsiveWidth(5),
		marginBottom: responsiveHeight(1),
	},

	cardImg: {
		position: "relative",
		height: responsiveHeight(17),
		width: responsiveWidth(30),
		marginTop: responsiveHeight(1),
		borderRadius: 20,
		resizeMode: "stretch",
	},
	cardTextDate: {
		position: "relative",
		bottom: responsiveHeight(2.5),
		left: responsiveWidth(6),
		fontSize: 15,
		fontWeight: "900",
		backgroundColor: "rgba(255,255,255,0.5)",
		borderRadius: 20,
	},
});
