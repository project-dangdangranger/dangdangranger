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
	const [dogData, setDogData] = useState(route.params);
	const [dogBirth, setDogBirth] = useState(null);
	const [dogAge, setDogAge] = useState<string>("");
	const [dogCreateDate, setDogCreateDate] = useState(null);
	const [randomScript, setRandomScript] = useState<string>("");

	useEffect(() => {
		console.log("dog detail:", route);
		axios.get(`/dog/${route.params.item.dogNo}`).then((res) => {
			setDogData(res.data.data);
			console.log("dog detail response: ", res.data);
			console.log("dog birth : ", res.data.data.dogBirth);

			setDogBirth(res.data.data.dogBirth.split("T")[0]);
			setDogAge(calculateAge(res.data.data.dogBirth.split("T")[0]));
			setDogCreateDate(res.data.data.createDate.split("T")[0]);
		});

		axios.get(`/dog/script`).then((res) => {
			console.log("렌덤 대사 : ", res.data.data.scriptContent);
			setRandomScript(res.data.data.scriptContent);
		});
	}, []);

	const calculateAge = (dogBirth: any) => {
		const currentDate = new Date();
		console.log("오늘 날짜: ", currentDate);

		const birth = new Date(dogBirth);
		console.log("강아지 생일 : ", birth);

		let ageYears = currentDate.getFullYear() - birth.getFullYear();
		let ageMonths = currentDate.getMonth() - birth.getMonth();

		if (
			currentDate.getDate() < birth.getDate() ||
			currentDate.getDate() === birth.getDate()
		) {
			ageMonths--;
		}

		// 생일이 지났을 경우 1살 추가
		if (
			currentDate.getFullYear() < birth.getFullYear() &&
			currentDate.getMonth() >= birth.getMonth() &&
			currentDate.getDate() >= birth.getDate()
		) {
			ageYears++;
		}

		if (ageYears >= 1) {
			return `${ageYears}세`;
		} else {
			return `${ageMonths}개월`;
		}
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="강아지 정보" />

				<Image source={{ uri: dogData?.dogImg }} style={styles.mainImg} />

				<View style={styles.mainTextContainer}>
					<Text style={styles.mainText}>{dogData?.dogName} </Text>
					<View style={styles.line} />
				</View>
				<View style={styles.dogContainer}>
					<View style={styles.dogItemCenter}>
						<View style={styles.dogItemContentRow}>
							<View style={styles.dogItemStyle}>
								<Text>나이</Text>
								<Text style={styles.dogItemMainText}>{dogAge}</Text>
							</View>
							<View style={styles.dogItemStyle}>
								<Text>성별</Text>
								<Text style={styles.dogItemMainText}>{dogData?.dogSex}</Text>
							</View>

							<View style={styles.dogItemStyle}>
								<Text>생일</Text>
								<Text style={styles.dogDataText}>{dogBirth}</Text>
							</View>
						</View>

						<View>
							<View style={styles.dogItemStyle}>
								<Text>견종</Text>

								<Text
									style={styles.dogItemBreedText}
									numberOfLines={1}
									ellipsizeMode="clip"
								>
									{dogData?.dogBreed}
								</Text>
							</View>
						</View>

						<View>
							<Text></Text>
						</View>

						<View style={styles.dogCreateDateStyle}>
							<Text>발급 일자</Text>
							<Text style={styles.dogDataText}>{dogCreateDate}</Text>
						</View>

						<View>
							<Text></Text>
						</View>

						<View style={{ marginBottom: responsiveHeight(4) }}>
							<Text>{randomScript}</Text>
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
		height: responsiveHeight(50),
	},
	mainTextContainer: {
		position: "absolute",
		top: responsiveHeight(50),
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
		marginHorizontal: responsiveWidth(10),
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
		marginHorizontal: responsiveWidth(10),
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
	dogCreateDateStyle: {
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
		fontSize: 18,
		fontWeight: "bold",
		overflow: "visible",
		marginRight: responsiveWidth(5),
	},
	dogDataText: { fontSize: 18, fontWeight: "bold" },

	subBtnLocation: {},
});
