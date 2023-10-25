import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/screens/Main";
import Profile from "./src/screens/Profile";
import Wallet from "./src/screens/Wallet";
import DogProfile from "./src/screens/DogProfile";
import MyWrite from "./src/screens/MyWrite";
import EditProfile from "./src/screens/EditProfile";

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
					<Stack.Screen name="DogProfile" component={DogProfile} />
					<Stack.Screen name="MyWrite" component={MyWrite} />
					<Stack.Screen name="EditProfile" component={EditProfile} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default App;
