import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/screens/Main";
import Profile from "./src/screens/Profile";
import Wallet from "./src/screens/Wallet";
import DogProfile from "./src/screens/DogProfile";
import MyWrite from "./src/screens/MyWrite";
import EditProfile from "./src/screens/EditProfile";
import MakeWallet1 from "./src/screens/MakeWallet1";
import MakeWallet2 from "./src/screens/MakeWallet2";
import MakeWallet3 from "./src/screens/MakeWallet3";
import DogList from "./src/screens/DogList";
import DogDetail from "./src/screens/DogDetail";
import Report from "./src/screens/Report";
import ReportDorList from "./src/screens/ReportDorList";

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
					<Stack.Screen name="MakeWallet1" component={MakeWallet1} />
					<Stack.Screen name="MakeWallet2" component={MakeWallet2} />
					<Stack.Screen name="MakeWallet3" component={MakeWallet3} />
					<Stack.Screen name="DogList" component={DogList} />
					<Stack.Screen name="DogDetail" component={DogDetail} />
					<Stack.Screen name="Report" component={Report} />
					<Stack.Screen name="ReportDorList" component={ReportDorList} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
};

export default App;
