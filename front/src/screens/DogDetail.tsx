import { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Platform,
	TouchableOpacity,
	ScrollView,
} from "react-native";
// import GestureFlipView from "../components/GestureFlipView";
import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import AbsoluteVar from "../recycles/FooterBar";
import CustomText from "../recycles/CustomText";
import PetrolImg from "../../assets/images/Patrol-license.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomSubButton from "../recycles/CustomSubBtn";
import ProfileImg from "../../assets/images/profileImg.png";
import { useNavigation } from "@react-navigation/native";
import axios from "../utils/axios";

const Profile = ({ route }) => {
	const navigation = useNavigation();
	const [data, setDate] = useState(route.params);

	// 나이 계산해서 해야 함 ㅇㅇㅇ

	useEffect(() => {
		console.log("라우트:", route);
		axios.get(`/dog/${route.params.item.dogNo}`).then((res) => {
			setDate(res.data.data);
			console.log(res.data.data);
		});
	}, []);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="강아지 정보" />

				<Image source={{ uri: data?.dogImg }} style={styles.mainImg} />

				<View style={styles.mainTextContainer}>
					<Text style={styles.mainText}>{data?.dogName} </Text>
					<View style={styles.line} />
				</View>
				<View style={styles.dogContainer}>
					<View style={styles.dogItemCenter}>
						<View style={styles.dogItemContentRow}>
							<View style={styles.dogItemStyle}>
								<Text>나이</Text>
								<Text style={styles.dogItemMainText}>{data?.dogNo}</Text>
							</View>
							<View style={styles.dogItemStyle}>
								<Text>성별</Text>
								<Text style={styles.dogItemMainText}>{data?.dogSex}</Text>
							</View>

							<View style={styles.dogItemStyle}>
								<Text>견종</Text>

								<Text
									style={styles.dogItemBreedText}
									numberOfLines={1}
									ellipsizeMode="clip"
								>
									{data?.dogBreed}
								</Text>
							</View>
							<View style={styles.dogItemStyle}>
								<Text>발급 일자</Text>
								<Text style={styles.dogDataText}>{data?.createDate}</Text>
							</View>
						</View>
						<View>
							<Text style={styles.randomText}>
								랜덤한 댕댕레인저 대사가 여기에 나옵니다.
							</Text>
						</View>
					</View>
				</View>

				<View style={styles.subBtnLocation}>
					<CustomSubButton
						text={"실종견 등록하기"}
						onPress={() => navigation.navigate("CreateDog")}
						color={"#70C8EE"}
					/>
				</View>
			</CommonLayout>
			<AbsoluteVar />
		</>
	);
};

export default Profile;

const styles = StyleSheet.create({
	mainImg: {
		position: "relative",
		width: responsiveWidth(100),
		height: responsiveHeight(30),
	},
	mainTextContainer: {
		position: "absolute",
		top: responsiveHeight(30),
		backgroundColor: "#fff",
		width: responsiveWidth(100),
		height: responsiveHeight(120),
		// justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
	},
	mainText: {
		fontSize: 30,
		fontWeight: "bold",
		marginTop: responsiveHeight(3),
	},
	line: {
		width: responsiveWidth(90),
		height: 1,
		backgroundColor: "#E8E8E8",
		marginVertical: responsiveHeight(1.5),
	},
	dogContainer: {
		justifyContent: "center",
		alignItems: "center",
		// marginRight: responsiveWidth(10),
	},
	dogItemCenter: {
		justifyContent: "center",
		// alignItems: "center",
		// marginTop: responsiveHeight(1),
	},

	imgcontainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(3),
	},
	imgRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: responsiveWidth(90),
	},
	BadgeImg: {
		height: 80,
		width: 60,
	},
	viewcontainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(0),
	},
	viewtext: {
		marginVertical: responsiveHeight(1),
		fontSize: 12,
		fontWeight: "bold",
	},
	dogcontainer: {
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: responsiveHeight(3),
	},

	dogItemText: {
		fontSize: 15,
		fontWeight: "900",
	},
	dogItemContentRow: {
		marginTop: responsiveHeight(4),
		width: responsiveWidth(70),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: responsiveHeight(2),
	},
	dogItemStyle: {
		justifyContent: "center",
		// alignItems: "center",
	},
	dogItemMainText: {
		fontSize: 18,
		fontWeight: "bold",
		marginRight: responsiveWidth(5),
	},
	dogItemSexText: {
		fontSize: 18,
		fontWeight: "bold",
		marginRight: responsiveWidth(5),
	},
	dogItemBreedText: {
		width: responsiveWidth(16),
		fontSize: 18,
		fontWeight: "bold",
		overflow: "visible",
		marginRight: responsiveWidth(5),
	},
	dogDataText: { fontSize: 18, fontWeight: "bold" },
	randomText: {
		marginTop: responsiveHeight(5),
		marginBottom: responsiveHeight(20),
	},
	subBtnLocation: {},
});
