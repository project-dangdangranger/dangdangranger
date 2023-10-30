import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from "react-native-linear-gradient";

type CustomButtonProps = {
	text1: string;
	onPress1: () => void;
	text2: string;
	onPress2: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
	text1,
	text2,
	onPress1,
	onPress2,
}) => {
	return (
		<>
			<View style={styles.rowcontainer}>
				<View style={styles.container}>
					<TouchableOpacity activeOpacity={0.7} onPress={onPress1}>
						<LinearGradient
							style={styles.button}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							colors={["#3E6DCA", "#70C8EE"]}
						>
							<View>
								<Text style={styles.text}>{text1}</Text>
							</View>
						</LinearGradient>
					</TouchableOpacity>
				</View>

				<View style={styles.container}>
					<TouchableOpacity activeOpacity={0.7} onPress={onPress2}>
						<LinearGradient
							style={styles.button}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							colors={["#3E6DCA", "#70C8EE"]}
						>
							<View>
								<Text style={styles.text}>{text2}</Text>
							</View>
						</LinearGradient>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	rowcontainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: responsiveHeight(5),
		// responsiveWidth: responsiveWidth(80),
		marginHorizontal: responsiveWidth(8),
	},
	container: {
		// justifyContent: "center",
		alignItems: "center",
		marginBottom: responsiveHeight(5),
	},
	button: {
		width: responsiveWidth(40),
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
