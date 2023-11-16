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

const ManualItem: React.FC<CustomButtonProps> = ({ text, onPress }) => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={{ borderRadius: 10 }}
				activeOpacity={0.7}
				onPress={onPress}
			>
				<View style={styles.button}>
					<Text style={styles.text}>{text}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(3),
		marginBottom: responsiveHeight(1),
	},
	button: {
		width: responsiveWidth(80),
		backgroundColor: "#3D6CC9",
		height: 46,
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

export default ManualItem;
