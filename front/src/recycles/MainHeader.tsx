import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	Animated,
} from "react-native";
import { useEffect, useState } from "react";
import DDRangers from "../../assets/images/Logo.png";
import HamburgerMenu from "../../assets/images/hamburger_menu_icon.png";
import SideMenu from "./SideMenu";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

const MainHeader = () => {
	const [activeSideMenu, setActiveSideMenu] = useState(false);
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
			<View style={styles.header}>
				<View style={styles.headermargin}>
					<Image source={DDRangers} style={styles.ddrangerslogo} />
				</View>
				<Text style={styles.logo}>댕댕레인저</Text>

				<TouchableOpacity activeOpacity={0.7} onPress={clickHamburger}>
					<Image source={HamburgerMenu} style={styles.menuIcon} />
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	header: {
		height: 80,
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: -1,
	},
	logo: {
		marginLeft: 0,
		fontSize: 25,
		fontWeight: "700",
		color: "#3E6DCA",
		paddingRight: 120,
	},
	ddrangerslogo: {
		width: 50,
		height: 50,
		marginBottom: -6,
		resizeMode: "cover",
	},
	menuIcon: {
		marginRight: 20,
	},
	headermargin: {
		marginLeft: 25,
	},
	sideMenu: {
		// width: responsiveWidth(70),
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		// backgroundColor: "#FFFFFF",
		zIndex: 999,
	},
});

export default MainHeader;
