import React, { useState } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import PatrolStopImg from "../../assets/images/PatrolStop.png";
import VibratingImage from "./VibratingImage";
import stopImg from "../../assets/images/Stop.png";
import startImg from "../../assets/images/Start.png";
import endImg from "../../assets/images/End.png";
import Patroling from "../../assets/images/Patroling.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

interface PatrolBtnProps {
	start: boolean;
	setStart: (active: boolean) => void;
	setPatrol: (active: boolean) => void;
}

const PatrolStopBtn: React.FC<PatrolBtnProps> = ({
	start,
	setStart,
	setPatrol,
}) => {
	return (
		<>
			<VibratingImage
				start={start}
				source={PatrolStopImg}
				style={styles.ImgContainer}
			></VibratingImage>
			<Image style={styles.Patroling} source={Patroling} />
			<TouchableOpacity
				style={styles.stopContainer}
				onPress={() => {
					setStart(!start);
				}}
			>
				{start ? (
					<Image style={styles.ImgStop} source={stopImg} />
				) : (
					<Image style={styles.ImgStart} source={startImg} />
				)}
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.stopContainer}
				onPress={() => {
					setPatrol(false);
					setStart(false);
				}}
			>
				<Image style={styles.ImgEnd} source={endImg} />
			</TouchableOpacity>
		</>
	);
};

export default PatrolStopBtn;

const styles = StyleSheet.create({
	ImgContainer: {
		position: "relative",
	},
	ImgStop: {
		position: "absolute",
		bottom: responsiveHeight(27),
	},
	ImgStart: {
		position: "absolute",
		bottom: responsiveHeight(27),
	},
	ImgEnd: {
		position: "absolute",
		left: responsiveWidth(10),
		bottom: responsiveHeight(5),
	},
	Patroling: {
		position: "absolute",
		top: responsiveHeight(13),
	},
	stopContainer: {},
});
