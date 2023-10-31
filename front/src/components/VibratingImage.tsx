import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

const RotatingImage = ({ start, source, style }: any) => {
	const animationValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (start) {
			animationValue.setValue(0); // 초기화
			Animated.loop(
				Animated.timing(animationValue, {
					toValue: 1,
					duration: 4000, // 4 seconds for a 360 degree rotation
					easing: Easing.linear,
					useNativeDriver: true,
				}),
			).start();
		} else {
			animationValue.stopAnimation();
			// 그다음 위치 기 억한다음 저장해야 함
		}
	}, [start]);

	const rotation = animationValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	const animatedStyle = {
		transform: [{ rotate: rotation }],
	};

	return <Animated.Image source={source} style={[style, animatedStyle]} />;
};

export default RotatingImage;
