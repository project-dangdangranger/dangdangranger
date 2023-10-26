import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const CommonLayout = ({ children }: any) => {
	const [renderError, setRenderError] = useState<Boolean>();
	const navigation = useNavigation();

	return (
		<>
			<SafeAreaProvider>
				<SafeAreaView edges={["top", "right", "bottom", "left"]}>
					<ScrollView>{children}</ScrollView>
				</SafeAreaView>
			</SafeAreaProvider>
		</>
	);
};

export default CommonLayout;
