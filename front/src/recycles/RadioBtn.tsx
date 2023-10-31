import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RadioBtn = ({ label, selected, onPress }: any) => {
	return (
		<>
			<TouchableOpacity style={style.option} onPress={onPress}>
				<View style={[style.circle, selected && style.selected]}></View>
				<Text style={label}>{label}</Text>
			</TouchableOpacity>
		</>
	);
};

export default RadioBtn;

const style = StyleSheet.create({
	option: {
		flexDirection: "row",
		alignItems: "center",
	},
	circle: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "gray",
		marginRight: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	selected: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: "blue",
	},
	label: {
		fontSize: 16,
	},
});
