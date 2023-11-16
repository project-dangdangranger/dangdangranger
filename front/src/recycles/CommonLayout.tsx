import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { View } from "react-native";

const CommonLayout = ({ children }: any) => {
	const [renderError, setRenderError] = useState<Boolean>();
	const navigation = useNavigation();

	return (
		<>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
						<View
							style={{ height: responsiveHeight(100), position: "absolute" }}
						/>
						{children}
					</ScrollView>
				</SafeAreaView>
			</SafeAreaProvider>
		</>
	);
};

export default CommonLayout;
