import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import PatrolStopImg from "../../assets/images/PatrolStop.png";
import { useState } from "react";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import VibratingImage from "./VibratingImage";
import stopImg from "../../assets/images/Stop.png";
import startImg from "../../assets/images/Start.png";
import endImg from "../../assets/images/End.png";

const PatrolBtn = () => {
	const [start, setStart] = useState(true);
	return (
		<>
			<View style={styles.container}>
				<VibratingImage
					start={start}
					source={PatrolStopImg}
					style={styles.ImgContainer}
				/>

				<TouchableOpacity
					style={styles.stopContainer}
					onPress={() => {
						setStart(!start);
					}}
				>
					{start ? (
						<Image style={styles.ImgStart} source={startImg} />
					) : (
						<Image style={styles.ImgStop} source={stopImg} />
					)}
				</TouchableOpacity>

				<TouchableOpacity style={styles.stopContainer}>
					<Image style={styles.ImgEnd} source={endImg} />
				</TouchableOpacity>
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
	stopContainer: {},
});

export default PatrolBtn;
