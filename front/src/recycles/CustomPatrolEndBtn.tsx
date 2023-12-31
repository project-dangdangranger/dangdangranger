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
				<LinearGradient
					style={styles.button}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					colors={["#FF6A6A", "#FF6A6A"]}
				>
					<View>
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
		marginBottom: responsiveHeight(6),
		zIndex: 99,
	},
	button: {
		width: responsiveWidth(35),
		backgroundColor: "#EE8A72",
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
