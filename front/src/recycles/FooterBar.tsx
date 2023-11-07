import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

import HomePng from "../../assets/images/Home.png";
import HomeFillPng from "../../assets/images/Home_fill.png";
import MingcuteSearchPng from "../../assets/images/mingcute_search.png";
import MingcuteSearchFillPng from "../../assets/images/mingcute_search_fill.png";
import TempPng from "../../assets/images/Home.png";
import ProfilePng from "../../assets/images/Profile.png";
import ProfileFillPng from "../../assets/images/Profile_fill.png";
import PatrolPng from "../../assets/images/dog.png";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../App";

const FooterBar = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const authHandling = (pageName: string) => {
		navigate(pageName);
	};

	return (
		<>
			<View style={styles.container}>
				<View>
					<TouchableOpacity
						style={styles.btnCenter}
						onPress={() => navigate("Main")}
					>
						<Image source={HomePng} style={styles.btnImg} />
						<Text>Home</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity onPress={() => authHandling("PatrolMain")}>
						<Image source={PatrolPng} style={styles.btnImg} />
						<Text>순찰</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity
						style={styles.btnCenter}
						onPress={() => navigate("MissingMain")}
					>
						<Image source={MingcuteSearchPng} style={styles.btnImg} />
						<Text>실종견</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity
						style={styles.btnCenter}
						onPress={() => navigate("Profile")}
					>
						<Image source={ProfilePng} style={styles.btnImg} />
						<Text>프로필</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default FooterBar;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#FCFCFC",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: responsiveWidth(10),
		paddingVertical: responsiveWidth(2),
		height: responsiveHeight(8),
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
