import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import NotFindIcon from "../../assets/images/findReady-icon.png";
import FindingIcon from "../../assets/images/finding-icon.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const FindBtn = ({
	startSession,
	endSession,
	isPressed,
	setIsPressed,
}: any) => {
	const handlePressBtn = () => {
		if (isPressed) {
			endSession();
		} else {
			startSession();
		}
		setIsPressed(!isPressed);
	};

	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity
					onPress={handlePressBtn}
					style={[
						styles.btnContainer,
						isPressed ? styles.isPressed : styles.isNotPressed,
					]}
				>
					<Image
						source={isPressed ? FindingIcon : NotFindIcon}
						style={styles.img}
					/>
					<Text style={styles.text}>{isPressed ? "신고하기" : "함께찾기"}</Text>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: responsiveHeight(10),
		left: responsiveWidth(45), // 왼쪽 끝에서 시작
		right: responsiveWidth(45), // 오른쪽 끝에서 시작
		justifyContent: "center", // 중앙 정렬
		alignItems: "center", // 중앙 정렬
	},
	btnContainer: {
		width: responsiveWidth(30), // 버튼의 너비
		height: responsiveWidth(30), // 버튼의 높이
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25, // 정사각형이므로 너비와 높이가 같음
	},
	img: {
		width: responsiveWidth(8),
		height: responsiveWidth(8),
	},
	text: {
		fontWeight: "bold",
		fontSize: 20,
	},
	isPressed: {
		backgroundColor: "#F66262",
	},
	isNotPressed: {
		backgroundColor: "#70C8EE",
	},
});

export default FindBtn;
