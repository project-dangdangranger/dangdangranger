import React, { useState, useRef } from "react";
import {
	Animated,
	View,
	TouchableOpacity,
	Image,
	ImageBackground,
	Text,
	StyleSheet,
} from "react-native";
import nftImg from "../../assets/images/emptyNFT.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const FlipCard = (dogData: any) => {
	console.log(dogData.dogData);
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

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={flipCard}>
				<Animated.View style={[styles.card, frontAnimatedStyle]}>
					<Image source={nftImg} style={styles.imgBackground} />
					<Image
						source={{ uri: dogData.dogData.dogImg }}
						style={styles.dogImg}
					/>
					<View style={styles.dogNameContainer}>
						<Text style={styles.dogName}>{dogData.dogData?.dogName}</Text>
					</View>
					<View style={styles.dogDate}>
						<Text style={styles.dogDateText}>2023.11.12</Text>
					</View>

					<View style={styles.dogcontent}>
						<Text style={styles.dogDateText}>
							위 요원은 댕댕레인저임을 임명합니다.
						</Text>
					</View>
				</Animated.View>
				<Animated.View
					style={[styles.card, backAnimatedStyle, styles.cardBack]}
				></Animated.View>
			</TouchableOpacity>
		</View>
	);
};

// 스타일 정의
const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	imgBackground: {
		zIndex: 5,
		height: responsiveHeight(80),
		width: responsiveWidth(90),
		borderRadius: 15,
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
	},
	cardBack: {
		position: "absolute",
		top: 0,
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

export default FlipCard;
