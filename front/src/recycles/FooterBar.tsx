import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
} from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../App";
import { useRecoilValue } from "recoil";
import { isLogged } from "../atoms/atoms";

const FooterBar = () => {
	const { navigate } = useNavigation<StackNavigation>();
	const islogged = useRecoilValue(isLogged);
	const toMove = (pageName: string) => {
		if (!islogged) {
			Alert.alert("로그인 필요", "로그인해주세요.");
			return;
		}
		navigate(pageName);
	};

	return (
		<>
			<View style={styles.container}>
				<View>
					<TouchableOpacity
						style={styles.btnCenter}
						onPress={() => toMove("Main")}
					>
						<Image source={HomePng} style={styles.btnImg} />
						<Text>Home</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity onPress={() => toMove("PatrolMain")}>
						<Image source={MingcuteSearchPng} style={styles.btnImg} />
						<Text>순찰</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity
						style={styles.btnCenter}
						onPress={() => toMove("MissingMain")}
					>
						<Image source={TempPng} style={styles.btnImg} />
						<Text>실종견</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity
						style={styles.btnCenter}
						onPress={() => toMove("Profile")}
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
