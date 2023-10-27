import { View, Text } from "react-native";
import MainCountLayout from "../styles/mainCountLayout";
import { useState } from "react";

const MainCount = ({
	patrol,
	missing,
}: {
	patrol: number;
	missing: number;
}) => {
	return (
		<>
			<View style={MainCountLayout.MainContainer}>
				<View style={MainCountLayout.MaincountContainer}>
					<View style={MainCountLayout.CountContainer}>
						<Text style={MainCountLayout.CountText}>현재{"\n"}순찰중</Text>
						<Text
							style={[
								MainCountLayout.CountNumber,
								MainCountLayout.NumberPatrol,
							]}
						>
							{patrol}
						</Text>
					</View>
					<View>
						<Text>현재 순찰중인 인원수</Text>
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
							{missing}
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

export default MainCount;
