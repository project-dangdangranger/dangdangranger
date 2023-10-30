import React, { useRef, useEffect } from "react";
import { View, Animated, Image, Easing } from "react-native";

const VibratingImage = ({ source, style }: any) => {
	const animationValue = useRef(new Animated.Value(0)).current;

	const startVibratingAnimation = () => {
		Animated.loop(
			Animated.sequence([
				Animated.timing(animationValue, {
					toValue: 1,
					duration: 50,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
				Animated.timing(animationValue, {
					toValue: -1,
					duration: 50,
					easing: Easing.linear,
					useNativeDriver: true,
				}),
			]),
		).start();
	};

	useEffect(() => {
		startVibratingAnimation();
	}, []);

	const animatedStyle = {
		transform: [{ translateX: animationValue }],
	};

	return <Animated.Image source={source} style={[style, animatedStyle]} />;
};

export default VibratingImage;
