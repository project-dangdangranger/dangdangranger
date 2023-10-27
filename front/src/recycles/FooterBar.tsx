import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

import HomePng from "../../assets/images/Home.png";
import HomeFillPng from "../../assets/images/Home_fill.png";
import MingcuteSearchPng from "../../assets/images/mingcute_search.png";
import MingcuteSearchFillPng from "../../assets/images/mingcute_search_fill.png";
import TempPng from "../../assets/images/Home.png";
import ProfilePng from "../../assets/images/Profile.png";
import { useNavigation } from "@react-navigation/native";

const AbsoluteVar = () => {
	const Navigation = useNavigation();
	return (
		<>
			<View style={styles.container}>
				<View>
					<TouchableOpacity
						style={styles.btnCenter}
						onPress={() => Navigation.navigate("Main")}
					>
						<Image source={HomePng} style={styles.btnImg} />
						<Text>Home</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity style={styles.btnCenter}>
						<Image source={MingcuteSearchPng} style={styles.btnImg} />
						<Text>순찰</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity style={styles.btnCenter}>
						<Image source={TempPng} style={styles.btnImg} />
						<Text>실종견</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity
						style={styles.btnCenter}
						onPress={() => Navigation.navigate("Profile")}
					>
						<Image source={ProfilePng} style={styles.btnImg} />
						<Text>프로필</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default AbsoluteVar;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FCFCFC",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: responsiveWidth(10),
		paddingVertical: responsiveWidth(2),
		// marginHorizontal: responsiveWidth(0),
		alignItems: "center",
	},
	btnCenter: {
		alignItems: "center",
		justifyContent: "center",
	},
	btnImg: {
		height: 35,
		width: 35,
	},
});
