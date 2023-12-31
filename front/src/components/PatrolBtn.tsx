import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import PatrolStartBtn from "./PatrolStartBtn";
import PatrolStopBtn from "./PatrolStopBtn";
import GoogleMap from "../screens/GoogleMap";

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
					<PatrolStopBtn
						start={start}
						setStart={setStart}
						setPatrol={setPatrol}
					/>
				) : (
					<PatrolStartBtn setPatrol={setPatrol} />
				)}
				<GoogleMap
					start={start}
					patrol={patrol}
					setStart={setStart}
					setPatrol={setPatrol}
				/>
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
