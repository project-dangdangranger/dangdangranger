import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";

// 뱃지 이미지들의 경로를 미리 정의
const badges = {
	badge1: require("./../../assets/images/badge-01.png"),
	badge2: require("./../../assets/images/badge-02.png"),
	badge3: require("./../../assets/images/badge-03.png"),
	badge4: require("./../../assets/images/badge-04.png"),
	badge5: require("./../../assets/images/badge-05.png"),
	badge6: require("./../../assets/images/badge-06.png"),
	badge7: require("./../../assets/images/badge-07.png"),
	badge8: require("./../../assets/images/badge-08.png"),
	badge9: require("./../../assets/images/badge-09.png"),
	badge10: require("./../../assets/images/badge-10.png"),
};

type BadgeType = keyof typeof badges;

interface BadgeProps {
	type: BadgeType;
}

const BadgeComponent: React.FC<BadgeProps> = ({ type }) => {
	const badgeImage: ImageSourcePropType = badges[type];

	return (
		<View>
			<Image source={badgeImage} style={{ width: 60, height: 80 }} />
		</View>
	);
};

export default BadgeComponent;
