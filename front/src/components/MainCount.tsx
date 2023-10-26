import { View, Text } from "react-native";
import MainCountLayout from "../styles/mainCountLayout";

const MainCount = () => {
	return (
		<>
			<View style={MainCountLayout.MainContainer}>
				<View style={MainCountLayout.MaincountContainer}>
					<Text>asdasdasdasd</Text>
				</View>
				<View style={MainCountLayout.MaincountContainer}>
					<Text>asdasdasdasd</Text>
				</View>
			</View>
		</>
	);
};

export default MainCount;
