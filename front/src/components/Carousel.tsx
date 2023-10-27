import React, { useRef, useState } from "react";
import { View, ScrollView, Text, Dimensions, StyleSheet } from "react-native";

const Carousel = () => {
	const [activeIndex, setActiveIndex] = useState(0);
	const scrollViewRef = useRef(null);
	const windowWidth = Dimensions.get("window").width;

	const data = ["Slide 1", "Slide 2", "Slide 3"];

	const handleScroll = (event: any) => {
		const scrollPosition = event.nativeEvent.contentOffset.x;
		const activeIndex = Math.floor(scrollPosition / windowWidth);
		setActiveIndex(activeIndex);
	};

	return (
		<View style={styles.container}>
			<ScrollView
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
				ref={scrollViewRef}
			>
				{data.map((item, index) => (
					<View style={[styles.slide, { width: windowWidth }]} key={index}>
						<Text>{item}</Text>
					</View>
				))}
			</ScrollView>
			<View style={styles.pagination}>
				{data.map((_, index) => (
					<View
						key={index}
						style={[styles.dot, index === activeIndex ? styles.activeDot : {}]}
					/>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	slide: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "lightgray",
		height: 200,
	},
	pagination: {
		flexDirection: "row",
		position: "absolute",
		bottom: 10,
		alignSelf: "center",
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "gray",
		marginHorizontal: 4,
	},
	activeDot: {
		backgroundColor: "blue",
	},
});

export default Carousel;
