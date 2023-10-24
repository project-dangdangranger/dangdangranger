import { View, Text, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

const AbsoluteVar = () => {
	return (
		<>
			<View style={styles.container}>
				<View>
					<Text>Home</Text>
				</View>
				<View>
					<Text>순찰</Text>
				</View>
				<View>
					<Text>실종견</Text>
				</View>
				<View>
					<Text>프로필</Text>
				</View>
			</View>
		</>
	);
};

export default AbsoluteVar;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "red",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: responsiveWidth(0),
	},
});
