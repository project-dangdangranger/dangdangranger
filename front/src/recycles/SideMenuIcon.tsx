import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
// import IndexStore from "../stores/IndexStore";

const SideMenuIcon = ({ title, imageIcon, movePage }: any) => {
	const navigation = useNavigation();
	// const { LoginStore } = IndexStore();

	const authHandling = () => {
		navigation.navigate(movePage);
		console.log(movePage);
	};
	return (
		<>
			<TouchableOpacity activeOpacity={0.7} onPress={authHandling}>
				<View style={styles.iconWrap}>
					<Image source={imageIcon} style={styles.sideMenuIcon} />
					<Text style={styles.text}>{title}</Text>
				</View>
			</TouchableOpacity>
		</>
	);
};

const styles = StyleSheet.create({
	iconWrap: {
		marginHorizontal: responsiveWidth(4),
		marginVertical: responsiveWidth(4),
		marginTop: 25,
	},
	sideMenuIcon: {
		width: 44,
		height: 44,
		resizeMode: "contain",
	},
	text: {
		fontSize: 10,
		fontWeight: "500",
		color: "#494949",
		marginTop: 4,
	},
});

export default SideMenuIcon;
