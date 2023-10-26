import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CustomTextComponent = ({ mainText, emphasizedText, emphasizedColor }) => {
	return (
		<View style={styles.mainWrap}>
			<Text style={styles.mainTitle}>
				{mainText}
				<Text style={{ ...styles.boldText, color: emphasizedColor }}>
					{emphasizedText}
				</Text>
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	mainWrap: {
		// 기존의 MainLayout.walkMainWrap 스타일 속성
	},
	mainTitle: {
		// 기존의 MainLayout.walkMainTitle 스타일 속성
	},
	boldText: {
		// 기존의 MainLayout.walkBoldText 스타일 속성
	},
});

export default CustomTextComponent;
