import React, { useEffect } from "react";
import {
	Image,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
	Platform,
} from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const MissingItem = ({ item, navigation }: any) => {
	// useEffect(() => {
	// 	console.log("Item : ", item);
	// 	console.log("navigation : ", navigation);
	// }, []);

	console.log("아이템 받았니?:", item);

	return (
		<TouchableOpacity
			// onPress={() => navigation.navigate("MissingDetail", item)}
			onPress={() => navigation.navigate("FindTogether", { item })}
		>
			<View style={styles.dogItem}>
				<Image source={{ uri: item.thumbnailUrl }} style={styles.dogImg} />
				<View style={styles.dogItemContentContainer}>
					<View style={styles.dogItemContentRow}>
						<View style={styles.dogItemStyle}>
							<Text style={styles.emphasizedText2}>실종 장소 </Text>
							<Text>{item.missingAddress?.slice(0, 48)}</Text>
							{/* <Text style={styles.dogItemMainText}>{item.dogSex}</Text> */}
						</View>
					</View>
					<View style={styles.dogItemContentRow}>
						<View style={styles.dogItemStyle}>
							<Text style={styles.emphasizedText1}>실종 시간</Text>
							<Text>
								{item.missingDate.slice(0, 10)} {item.missingDate.slice(11, 13)}
								시 {item.missingDate.slice(14, 16)}분
							</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default MissingItem;

const styles = StyleSheet.create({
	dogItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 20,
		backgroundColor: "#fff",
		marginBottom: responsiveHeight(3),
		...Platform.select({
			ios: {
				shadowColor: "black",
				shadowOffset: { width: 0, height: 1 },
				shadowOpacity: 0.9,
				shadowRadius: 20,
			},
			android: {
				elevation: 20,
			},
		}),
	},
	dogImg: {
		resizeMode: "cover",
		width: responsiveWidth(30),
		height: responsiveHeight(15),
		borderRadius: 10,
		marginRight: 10,
	},
	dogItemText: {
		fontSize: 15,
		fontWeight: "900",
	},
	dogTitle: {
		fontSize: 17,
		fontWeight: "bold",
	},
	dogItemContentContainer: {
		height: responsiveHeight(15),
		width: responsiveWidth(45),
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "flex-start",
		paddingVertical: responsiveHeight(1),
	},
	dogItemContentRow: {
		width: responsiveWidth(40),
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		// paddingBottom: responsiveHeight(2),
		padding: 2,
	},
	dogItemStyle: {
		justifyContent: "center",
		// alignItems: "center",
	},
	dogItemMainText: {
		fontSize: 15,
		fontWeight: "bold",
	},
	dogItemSexText: {
		fontSize: 15,
		fontWeight: "bold",
	},
	dogItemBreedText: {
		width: responsiveWidth(16),
		fontSize: 15,
		fontWeight: "bold",
		overflow: "visible",
	},
	emphasizedText1: {
		fontWeight: "bold",
		fontSize: 15,
		color: "#3E6DCA",
	},
	emphasizedText2: {
		fontWeight: "bold",
		fontSize: 15,
		color: "#FF6A6A",
	},
});
