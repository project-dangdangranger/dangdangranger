import { View, Text } from "react-native";
import MainCountLayout from "../styles/mainCountLayout";
import { useState } from "react";

const MissingCount = ({
	missingTogether,
	missingDog,
}: {
	missingTogether: number;
	missingDog: number;
}) => {
	return (
		<>
			<View style={MainCountLayout.MainContainer}>
				<View style={MainCountLayout.MaincountContainer}>
					<View style={MainCountLayout.CountContainer}>
						<Text style={MainCountLayout.CountText}>함께{"\n"}찾는중</Text>
						<Text
							style={[
								MainCountLayout.CountNumber,
								MainCountLayout.NumberPatrol,
							]}
						>
							{missingTogether}
						</Text>
					</View>
					<View>
						<Text>현재 함께 찾는 인원수</Text>
					</View>
				</View>
				<View style={MainCountLayout.MaincountContainer}>
					<View style={MainCountLayout.CountContainer}>
						<Text style={MainCountLayout.CountText}>실종견{"\n"}마리수</Text>
						<Text
							style={[
								MainCountLayout.CountNumber,
								MainCountLayout.NumberMissing,
							]}
						>
							{missingDog}
						</Text>
					</View>
					<View>
						<Text>
							현재 실종견{"("}일주일 기준{")"}
						</Text>
					</View>
				</View>
			</View>
		</>
	);
};

export default MissingCount;
