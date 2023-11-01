import React, { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

const RotatingImage = ({ start, source, style }: any) => {
	const animationValue = useRef(new Animated.Value(0)).current;
	const currentAngle = useRef(0); // 현재 각도를 저장하는 ref

	useEffect(() => {
		const runAnimation = () => {
			animationValue.setValue(currentAngle.current); // 현재 각도에서 시작
			Animated.timing(animationValue, {
				toValue: currentAngle.current + 360,
				duration: 4000,
				easing: Easing.linear,
				useNativeDriver: false,
			}).start(({ finished }) => {
				if (finished) {
					currentAngle.current += 360; // 한 바퀴 회전을 마침
					currentAngle.current %= 360; // 값을 0-359 범위로 유지
					runAnimation(); // 다음 회전 시작
				}
			});
		};

		if (start) {
			runAnimation();
		} else {
			animationValue.stopAnimation((value) => {
				currentAngle.current = value % 360; // 멈춘 각도를 저장
			});
		}
	}, [start]);

	const rotation = animationValue.interpolate({
		inputRange: [0, 360],
		outputRange: ["0deg", "360deg"],
	});

	const animatedStyle = {
		transform: [{ rotate: rotation }],
		height: responsiveHeight(40),
	};

	return <Animated.Image source={source} style={[style, animatedStyle]} />;
};

export default RotatingImage;
