import { useEffect, useRef, useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	Platform,
	TouchableOpacity,
	ScrollView,
	ImageBackground,
	Animated,
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
import nftImg from "../../assets/images/emptyNFT.png";
import FlipCard from "../components/FlipCard";

const Profile = ({ route }) => {
	const navigation = useNavigation();
	const [dogData, setDogData] = useState(route.params);
	const [dogBirth, setDogBirth] = useState(null);
	const [dogAge, setDogAge] = useState<string>("");
	const [dogCreateDate, setDogCreateDate] = useState(null);
	const [randomScript, setRandomScript] = useState<string>("");

	useEffect(() => {
		initFunction();
	}, []);

	const initFunction = () => {
		axios.get(`/dog/${route.params.item.dogNo}`).then((res) => {
			setDogData(res.data.data);
			console.log("dogdata", dogData);
			setDogBirth(res.data.data.dogBirth.split("T")[0]);
			setDogAge(calculateAge(res.data.data.dogBirth.split("T")[0]));
			setDogCreateDate(
				res.data.data.createDate.split("T")[0].replace(/-/gi, "."),
			);
		});
		axios.get(`/dog/script`).then((res) => {
			console.log("렌덤 대사 : ", res.data.data.scriptContent);
			setRandomScript(res.data.data.scriptContent);
		});
	};

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

	// *** flip card 관련 ***
	const [isFlipped, setIsFlipped] = useState(false);
	const animatedValue = useRef(new Animated.Value(0)).current;

	const frontInterpolate = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ["0deg", "180deg"],
	});

	const backInterpolate = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ["180deg", "360deg"],
	});

	const frontAnimatedStyle = {
		transform: [{ rotateY: frontInterpolate }],
	};

	const backAnimatedStyle = {
		transform: [{ rotateY: backInterpolate }],
	};

	const flipCard = () => {
		if (isFlipped) {
			Animated.timing(animatedValue, {
				toValue: 0,
				duration: 800,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(animatedValue, {
				toValue: 180,
				duration: 800,
				useNativeDriver: true,
			}).start();
		}
		setIsFlipped(!isFlipped);
	};

	// *** ***

	return (
		<>
			<CommonLayout>
				<ColorHeader title="강아지 정보" />
				<View style={styles.container}>
					<TouchableOpacity onPress={flipCard}>
						{/* *** 카드 앞면 *** */}
						<Animated.View style={[styles.card, frontAnimatedStyle]}>
							<View style={styles.shadowview}>
								<Image source={nftImg} style={styles.imgBackground} />
								<Image source={{ uri: dogData.dogImg }} style={styles.dogImg} />
								<View style={styles.dogNameContainer}>
									<Text style={styles.dogName}>{dogData?.dogName}</Text>
								</View>
								<View style={styles.dogDate}>
									<Text style={styles.dogDateText}>{dogCreateDate}</Text>
								</View>

								<View style={styles.dogcontent}>
									<Text style={styles.dogDateText}>
										위 요원은 댕댕레인저임을 임명합니다.
									</Text>
								</View>
							</View>
						</Animated.View>
						{/* *** 카드 뒷면 *** */}
						<Animated.View
							style={[styles.card, backAnimatedStyle, styles.cardBack]}
						>
							<View style={styles.dogContainer}>
								<Image
									source={{ uri: dogData.dogImg }}
									style={styles.dogInfoImg}
								/>
								<View style={styles.dogItemCenter}>
									<View style={styles.dogItemContentRow}>
										<View style={styles.dogItemStyle}>
											<Text>나이</Text>
											<Text style={styles.dogItemMainText}>{dogAge}</Text>
										</View>
										<View style={styles.dogItemStyle}>
											<Text>성별</Text>
											<Text style={styles.dogItemMainText}>
												{dogData?.dogSex}
											</Text>
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
									<CustomSubButton
										text={"실종견 등록하기"}
										onPress={() => navigation.navigate("CreateDog")}
										color={"#70C8EE"}
									/>
								</View>
							</View>
						</Animated.View>
					</TouchableOpacity>
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

	container: {
		alignItems: "center",
	},
	imgBackground: {
		zIndex: 5,
		height: responsiveHeight(80),
		width: responsiveWidth(90),
		borderRadius: 15,
	},
	shadowview: {
		height: responsiveHeight(80),
		width: responsiveWidth(90),
		elevation: 15,
		alignItems: "center",
	},
	dogImg: {
		zIndex: 1,
		position: "absolute",
		height: responsiveWidth(50),
		width: responsiveWidth(50),
		resizeMode: "contain",
		bottom: responsiveHeight(37),
		borderRadius: 100,
	},
	card: {
		height: responsiveHeight(80),
		width: responsiveWidth(90),
		alignItems: "center",
		justifyContent: "center",
		backfaceVisibility: "hidden",
		// elevation: 1,
	},
	cardBack: {
		position: "absolute",
		top: 0,
		//borderWidth: 1,
		//borderColor: "gray",
		borderRadius: 15,
		backgroundColor: "white",
		elevation: 10,
	},
	dogInfoImg: {
		width: responsiveWidth(90),
		height: responsiveHeight(34),
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,

		// zIndex: -1,
		// resizeMode: "stretch",
	},
	dogName: {
		fontSize: 20,
		color: "#fff",
	},
	dogNameContainer: {
		position: "absolute",
		zIndex: 10,
		bottom: responsiveHeight(29),
	},
	dogDate: {
		position: "absolute",
		zIndex: 11,
		bottom: responsiveHeight(13.2),
	},
	dogDateText: {
		fontSize: 20,
		color: "#2d2d2d",
	},
	dogcontent: {
		zIndex: 11,
		position: "absolute",
		bottom: responsiveHeight(23),
	},
});
