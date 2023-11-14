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

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPress }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity activeOpacity={0.7} onPress={onPress}>
				<LinearGradient
					style={styles.button}
					start={{ x: 0, y: 0 }}
					end={{ x: 1, y: 1 }}
					colors={["#3E6DCA", "#70C8EE"]}
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
	},
	button: {
		width: responsiveWidth(85),
		backgroundColor: "#EE8A72",
		height: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
	},
	text: {
		fontSize: 17,
		fontWeight: "900",
		color: "#FFFFFF",
	},
});

export default CustomButton;
