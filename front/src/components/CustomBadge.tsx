import React from "react";
import {
	TouchableOpacity,
	View,
	Text,
	StyleSheet,
	Image,
	Alert,
} from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "react-native-linear-gradient";
import badge from "../../assets/images/badge.png";

type CustomButtonProps = {
	text: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({ text }) => {
	const AlertBadge = () => {
		Alert.alert("방범대원을 등록해보세요!");
	};
	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.7} onPress={AlertBadge}>
				<LinearGradient
					style={styles.button}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					colors={["#3E6DCA", "#70C8EE"]}
				>
					<View style={styles.rowcontainer}>
						<Image source={badge} style={styles.img} />
						<Text style={styles.text}>{text}</Text>
					</View>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// justifyContent: "center",
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

export default CustomButton;
