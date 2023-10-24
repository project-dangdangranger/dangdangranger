import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/screens/Main";
import Profile from "./src/screens/Profile";
import Wallet from "./src/screens/Wallet";

const App = () => {
	const Stack = createNativeStackNavigator();

	return (
		<>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Main"
					screenOptions={{
						headerShown: false,
						// cardStyle: { backgroundColor: "white" },
					}}
				>
					<Stack.Screen name="Main" component={Main} />
					<Stack.Screen name="Profile" component={Profile} />
					<Stack.Screen name="Wallet" component={Wallet} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default App;
