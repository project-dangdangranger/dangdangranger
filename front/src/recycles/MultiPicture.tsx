import React, { useState, useRef } from "react";
import { ScrollView, View, Image, Text, StyleSheet } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import Img1 from "../../assets/images/photo-ex-img2.png";
import Img2 from "../../assets/images/photo-ex-img3.png";
import Img3 from "../../assets/images/photo-ex-img4.png";

const MyHorizontalScrollView = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const scrollViewRef = useRef(null);

	// 페이지가 변경될 때 호출됩니다.
	const handleScroll = (event) => {
		const contentOffsetX = event.nativeEvent.contentOffset.x;
		const newIndex = Math.round(contentOffsetX / responsiveWidth(60));
		if (newIndex !== currentIndex) {
			setCurrentIndex(newIndex);
		}
	};

	// 페이지 인디케이터를 렌더링합니다.
	const renderPagination = () => {
		return (
			<View style={styles.paginationWrapper}>
				{[...Array(3).keys()].map((key, index) => (
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
				scrollEventThrottle={16} // iOS에서 스크롤 이벤트를 받는 빈도를 결정합니다.
				showsHorizontalScrollIndicator={false}
				style={styles.scrollViewStyle}
			>
				<View style={styles.viewStyle}>
					<Image style={styles.viewStyle} source={Img1} />
					<View style={styles.textView}>
						<Text style={styles.text}>서울특별시 역삼동</Text>
					</View>
				</View>
				<View style={styles.viewStyle}>
					<Image style={styles.viewStyle} source={Img2} />
					<View style={styles.textView}>
						<Text style={styles.text}>서울특별시 역삼동</Text>
					</View>
				</View>
				<View style={styles.viewStyle}>
					<Image style={styles.viewStyle} source={Img3}></Image>
					<View style={styles.textView}>
						<Text style={styles.text}>서울특별시 역삼동</Text>
					</View>
				</View>
				<View style={styles.viewStyle}>
					<Image style={styles.viewStyle} source={Img1} />
					<View style={styles.textView}>
						<Text style={styles.text}>서울특별시 역삼동</Text>
					</View>
				</View>
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
		postion: "relative",
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
