import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import PatrolStartImg from "../../assets/images/patrol-start-btnImg.png";
import { useState } from "react";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import VibratingImage from "./VibratingImage";
import { useNavigation } from "@react-navigation/native";

const PatrolBtn = () => {
	const [isPatrol, setIsPatrol] = useState(false);
	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity onPress={() => {}}>
					<Image source={PatrolStartImg}></Image>
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
});

export default PatrolBtn;
