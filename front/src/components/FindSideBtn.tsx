import {
	View,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity,
	Alert,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import TopIcon from "../../assets/images/plus-icon.png";
import BottomIcon from "../../assets/images/my-location-icon.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const FindSideBtn = () => {
	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.btnContainer}
					onPress={() => Alert.alert("실종견 정보가 나올거임  ")}
				>
					<Image source={TopIcon} style={styles.img}></Image>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.btnContainer}
					onPress={() => Alert.alert("자기 위치로 가야됨")}
				>
					<Image source={BottomIcon} style={styles.img}></Image>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: responsiveHeight(8),
		left: responsiveWidth(85), // 왼쪽 끝에서 시작
		right: responsiveWidth(15), // 오른쪽 끝에서 시작
		justifyContent: "center", // 중앙 정렬
		alignItems: "center", // 중앙 정렬
		backgroundColor: "black",
	},
	btnContainer: {
		backgroundColor: "white",
		borderRadius: 100,
		height: responsiveWidth(15),
		width: responsiveWidth(15),
		alignItems: "center",
		justifyContent: "center",
		marginVertical: responsiveHeight(2),
	},
	img: {
		width: responsiveWidth(5),
		height: responsiveWidth(5),
	},
});

export default FindSideBtn;
