import React, { useState, useRef } from "react";
import {
	ScrollView,
	View,
	Image,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import axios from "../utils/axios";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const MyHorizontalScrollView = () => {
	const navigation = useNavigation();
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollViewRef = useRef(null);

	const [imgList, setImgList] = useState([]);
	useFocusEffect(
		React.useCallback(() => {
			axios.get("/missing/recent_missing_images").then((res) => {
				console.log("도그사진들: ", res.data.data);
				setImgList(res.data.data);
			});
		}, []),
	);

	const handleScroll = (event: any) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const newIndex = Math.round(contentOffsetX / responsiveWidth(80));
		if (newIndex !== currentIndex) {
			setCurrentIndex(newIndex);
		}
	};
	const renderPagination = () => {
		return (
			<View style={styles.paginationWrapper}>
				{[...Array(imgList.length).keys()].map((key, index) => (
					<View
						key={key}
						style={[
							styles.paginationDot,
							{ opacity: currentIndex === index ? 1 : 0.5 },
						]}
					/>
				))}
			</View>
		);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				ref={scrollViewRef}
				horizontal
				pagingEnabled
				onScroll={handleScroll}
				scrollEventThrottle={16}
				showsHorizontalScrollIndicator={false}
				style={styles.scrollViewStyle}
			>
				{imgList?.map((img, index) => {
					return (
						<View key={img.missingNo} style={styles.viewStyle}>
							<Image style={styles.viewStyle} source={{ uri: img.imageUrl }} />

							<TouchableOpacity
								onPress={() => {
									console.log("이동할 No:", img.missingNo);
									navigation.navigate("MissingCarouselDetail", img);
								}}
								style={styles.textView}
							>
								<Text style={styles.text}>이동하기</Text>
							</TouchableOpacity>
						</View>
					);
				})}
			</ScrollView>
			{renderPagination()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: responsiveWidth(10),
	},
	scrollViewStyle: {
		width: responsiveWidth(80),
	},
	viewStyle: {
		position: "relative",
		width: responsiveWidth(80),
		height: responsiveHeight(30),
		borderRadius: 10,
		resizeMode: "cover",
	},
	paginationWrapper: {
		position: "absolute",
		bottom: 10,
		left: 0,
		right: 0,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
	},
	paginationDot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: "black",
		margin: 3,
	},
	text: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	textView: {
		backgroundColor: "rgba(0,0,0,0.5)",
		paddingHorizontal: responsiveWidth(3),
		paddingVertical: responsiveHeight(1),
		marginTop: responsiveHeight(0.5),
		right: responsiveWidth(1),
		borderRadius: 20,
		zIndex: 20,
		position: "absolute",
		top: 0,
	},
});

export default MyHorizontalScrollView;
