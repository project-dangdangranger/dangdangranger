import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import PatrolStopImg from "../../assets/images/PatrolStop.png";
import { useEffect, useState } from "react";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import VibratingImage from "./VibratingImage";
import stopImg from "../../assets/images/Stop.png";
import startImg from "../../assets/images/Start.png";
import endImg from "../../assets/images/End.png";
import PatrolStartBtn from "./PatrolStartBtn";
import Patroling from "../../assets/images/Patroling.png";

const PatrolBtn = () => {
	const [start, setStart] = useState(true);
	const [patrol, setPatrol] = useState(false);

	useEffect(() => {
		setStart(true);
	}, [patrol]);

	return (
		<>
			<View style={styles.container}>
				{patrol ? (
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
							}}
						>
							<Image style={styles.ImgEnd} source={endImg} />
						</TouchableOpacity>
					</>
				) : (
					<PatrolStartBtn setPatrol={setPatrol} />
				)}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		// justifyContent: "center",
		// backgroundColor: "red",
		alignItems: "center",
		marginBottom: responsiveHeight(10),
	},
	button: {
		width: responsiveWidth(70),
		backgroundColor: "#EE8A72",
		height: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
	},
	rowcontainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	text: {
		fontSize: 17,
		fontWeight: "900",
		color: "#FFFFFF",
	},
	img: {
		width: 25,
		height: 30,
		position: "absolute",
		left: -35,
	},
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

export default PatrolBtn;
