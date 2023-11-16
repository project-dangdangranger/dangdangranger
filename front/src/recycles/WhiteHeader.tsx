import { useState } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	Animated,
} from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import WhitePreview from "../../assets/images/white-preview-icon.png";
import WhiteHamburgerIcon from "../../assets/images/hamburger_menu_icon.png";
import SideMenu from "./SideMenu";

const WhiteHeader = ({ title }: any) => {
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
			<View style={styles.whiteHeaderWrap}>
				<Animated.View
					style={{ transform: [{ translateX: sideMenuPosition }] }}
				>
					<SideMenu clickX={clickX} />
					<View style={{ height: responsiveHeight(70) }}></View>
				</Animated.View>
				<TouchableOpacity activeOpacity={0.7} onPress={() => navigation.pop()}>
					<Image source={WhitePreview} />
				</TouchableOpacity>
				<View style={styles.logoWrap}>
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("Main")}
					>
						<Text style={styles.logoTitle}>IDOG</Text>
					</TouchableOpacity>
					<View style={styles.verticalLine}></View>
					<Text style={styles.headerTitle}>{title}</Text>
				</View>
				<TouchableOpacity activeOpacity={0.7} onPress={clickHamburger}>
					<Image source={WhiteHamburgerIcon} />
				</TouchableOpacity>
			</View>
			{activeSideMenu ? (
				<SideMenu updateActiveSideMenu={updateActiveSideMenu} />
			) : (
				<></>
			)}
		</>
	);
};

const styles = StyleSheet.create({
	whiteHeaderWrap: {
		height: 80,
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
		color: "#FFFFFF",
	},
	verticalLine: {
		width: 2,
		height: 20,
		backgroundColor: "#FFFFFF",
		marginHorizontal: 10,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#FFFFFF",
	},
});

export default WhiteHeader;
