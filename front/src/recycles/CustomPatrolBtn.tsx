import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "react-native-linear-gradient";

type CustomButtonProps = {
	text: string;
	onPress: () => void;
};

const CustomPatrolBtn: React.FC<CustomButtonProps> = ({ text, onPress }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.7} onPress={onPress}>
				<View style={styles.button}>
					<View>
						<Text style={styles.text}>{text}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// justifyContent: "center",
		alignItems: "center",
		marginBottom: responsiveHeight(6),
		zIndex: 99,
	},
	button: {
		width: responsiveWidth(35),
		backgroundColor: "#3E6DCA",
		height: 80,
		// display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	text: {
		fontSize: 25,
		fontWeight: "900",
		color: "#FFFFFF",
	},
});

export default CustomPatrolBtn;
