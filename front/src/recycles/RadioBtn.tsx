import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const RadioBtn = ({ label, selected, onPress }: any) => {
	return (
		<>
			<TouchableOpacity
				style={[style.btnBox, selected && style.boxSelected]}
				onPress={onPress}
			>
				<Text style={(style.btnText, selected && style.textSelected)}>
					{label}
				</Text>
			</TouchableOpacity>
		</>
	);
};

export default RadioBtn;

const style = StyleSheet.create({
	btnBox: {
		color: "808080",
		paddingHorizontal: responsiveWidth(1),
		paddingVertical: responsiveHeight(0.3),
		alignContent: "center",
		justifyContent: "center",
	},
	boxSelected: {
		borderWidth: 2,
		borderRadius: 6,
		borderColor: "#70C8EE",
	},
	btnText: {
		fontSize: 20,
		fontWeight: "300",
	},
	textSelected: {
		color: "#70C8EE",
		fontWeight: "900",
	},
});
