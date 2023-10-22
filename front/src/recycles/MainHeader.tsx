import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import DDRangers from "../../assets/images/DDrangers-logo.png";
import HamburgerMenu from "../../assets/images/hamburger-menu-icon.png";
// import SideMenu from "./SideMenu";

const MainHeader = () => {
	const [activeSideMenu, setActiveSideMenu] = useState<Boolean>(false);
	const clickHamburger = () => {
		switch (activeSideMenu) {
			case true:
				setActiveSideMenu(false);
				break;
			case false:
				setActiveSideMenu(true);
				break;
		}
	};

	const updateActiveSideMenu = (status: Boolean) => {
		setActiveSideMenu(status);
	};

	return (
		<>
			<View style={styles.header}>
				<View style={styles.headermargin}>
					<Image source={DDRangers} style={styles.ddrangerslogo} />
				</View>
				<Text style={styles.logo}>댕댕레인저</Text>

				<TouchableOpacity activeOpacity={0.7} onPress={clickHamburger}>
					<Image source={HamburgerMenu} style={styles.menuIcon} />
				</TouchableOpacity>
			</View>
			{/* {activeSideMenu ? (
				<SideMenu updateActiveSideMenu={updateActiveSideMenu} />
			) : (
				<></>
			)} */}
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
});

export default MainHeader;
