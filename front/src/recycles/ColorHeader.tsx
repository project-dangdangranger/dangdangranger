import { useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";
import SideMenu from "./SideMenu";
import Preview from "../../assets/images/preview-icon.png";
import HamburgerIcon from "../../assets/images/hamburger_menu_icon.png";

const ColorHeader = ({ title }: any) => {
	const navigation = useNavigation();
	const [activeSideMenu, setActiveSideMenu] = useState<Boolean>(false);
	const sideMenuPosition = useState(
		new Animated.Value(-responsiveWidth(100)),
	)[0];
	const clickHamburger = () => {
		if (activeSideMenu) {
			setActiveSideMenu(false);
			Animated.timing(sideMenuPosition, {
				toValue: responsiveWidth(-100),
				duration: 300,
				useNativeDriver: false,
			}).start();
		} else {
			setActiveSideMenu(true);
			Animated.timing(sideMenuPosition, {
				toValue: responsiveWidth(0),
				duration: 300,
				useNativeDriver: false,
			}).start();
		}
	};

	const clickX = () => {
		Animated.timing(sideMenuPosition, {
			toValue: responsiveWidth(-100),
			duration: 300,
			useNativeDriver: false,
		}).start(() => setActiveSideMenu(false));
	};

	const updateActiveSideMenu = (status: Boolean) => {
		setActiveSideMenu(status);
	};
	return (
		<>
			<View style={styles.sideMenu}>
				<Animated.View
					style={{ transform: [{ translateX: sideMenuPosition }] }}
				>
					<SideMenu clickX={clickX} />
					<View style={{ height: responsiveHeight(70) }}></View>
				</Animated.View>
			</View>
			<View style={styles.whiteHeaderWrap}>
				<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()}>
					<Image source={Preview} />
				</TouchableOpacity>
				<View style={styles.logoWrap}>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("Main")}
					>
						<Text style={styles.logoTitle}>댕댕레인저</Text>
					</TouchableOpacity>
					<View style={styles.verticalLine}></View>
					<Text style={styles.headerTitle}>{title}</Text>
				</View>
				<TouchableOpacity activeOpacity={0.7} onPress={clickHamburger}>
					<Image source={HamburgerIcon} />
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	whiteHeaderWrap: {
		height: responsiveHeight(8),
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: responsiveWidth(2),
	},
	logoWrap: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	logoTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#3E6DCA",
	},
	verticalLine: {
		width: 2,
		height: 20,
		backgroundColor: "#3E6DCA",
		marginHorizontal: 10,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#656565",
	},
	sideMenu: {
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 999,
	},
});

export default ColorHeader;
