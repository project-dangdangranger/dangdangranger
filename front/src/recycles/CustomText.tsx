import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
	responsiveWidth,
	responsiveHeight,
} from "react-native-responsive-dimensions";

type CustomTextComponentProps = {
	mainText: string;
	emphasizedText: string;
	emphasizedColor: string;
	finalText: string;
};

const CustomTextComponent: React.FC<CustomTextComponentProps> = ({
	mainText,
	emphasizedText,
	emphasizedColor,
	finalText,
}) => {
	return (
		<View style={styles.mainWrap}>
			<Text style={styles.mainTitle}>
				{mainText} {`\n`}
				<Text style={{ ...styles.boldText, color: emphasizedColor }}>
					{emphasizedText}
				</Text>
				{finalText}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	mainWrap: {
		marginHorizontal: responsiveWidth(5),
	},
	mainTitle: {
		marginTop: responsiveHeight(3),
		fontSize: 24,
		fontWeight: "700",
		color: "#616166",
		paddingHorizontal: responsiveWidth(5),
	},
	boldText: {
		fontWeight: "700",
		color: "#3E6DCA",
	},
});

export default CustomTextComponent;
