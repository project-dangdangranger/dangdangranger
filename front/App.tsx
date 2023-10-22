import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/screens/Main";
import { Text } from "react-native";

const App = () => {
	const Stack = createNativeStackNavigator();

	return (
		<>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Main"
					screenOptions={{ headerShown: false }}
				>
					<Stack.Screen name="Main" component={Main} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default App;
