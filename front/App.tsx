import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { RecoilRoot } from "recoil";
import Main from "./src/screens/Main";
import Profile from "./src/screens/Profile";
import Wallet from "./src/screens/Wallet";
import DogProfile from "./src/screens/DogProfile";
import MyWrite from "./src/screens/MyWrite";
import MakeWallet1 from "./src/screens/MakeWallet1";
import MakeWallet2 from "./src/screens/MakeWallet2";
import MakeWallet3 from "./src/screens/MakeWallet3";
import DogList from "./src/screens/DogList";
import DogDetail from "./src/screens/DogDetail";
import Report from "./src/screens/Report";
import ReportDorList from "./src/screens/ReportDorList";
import PatrolMain from "./src/screens/PatrolMain";
import PatrolGo from "./src/screens/PatrolGo";
import GoogleMap from "./src/screens/GoogleMap";
import PatrolMap from "./src/screens/PatrolMap";
import PatrolLog from "./src/screens/PatrolLog";
import PatrolDiary from "./src/screens/PatrolDiary";
import PatrolDiaryWrite from "./src/screens/CreatePatrolDiary";
import MissingMain from "./src/screens/MissingMain";
import MissingFind from "./src/screens/MissingFind";
import MissingDetail from "./src/screens/MissingDetail";
import CreateMissingDog from "./src/screens/CreateMissingDog";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import PatrolLogDetail from "./src/screens/PatrolLogDetail";
import WalletMine from "./src/screens/WalletMine";
import CreateDog from "./src/screens/CreateDog";
import PrivateKey from "./src/screens/PrivateKey";
import UpdateInfo from "./src/screens/UpdateInfo";
import PatrolReportDetail from "./src/screens/PatrolReportDetail";
import FindTogether from "./src/screens/FindTogether";
import { TextEncoder, TextDecoder } from "text-encoding";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import ManualMain from "./src/screens/ManualMain";
import CreateMissingMyDog from "./src/screens/CreateMissingMyDog";
import MissingCarouselDetail from "./src/screens/MissingCarouselDetail";
import FindMissingDog from "./src/screens/FindMissingDog";

const App = () => {
	const Stack = createNativeStackNavigator();

	return (
		<RecoilRoot>
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
					<Stack.Screen name="MakeWallet1" component={MakeWallet1} />
					<Stack.Screen name="MakeWallet2" component={MakeWallet2} />
					<Stack.Screen name="MakeWallet3" component={MakeWallet3} />
					<Stack.Screen name="DogList" component={DogList} />
					<Stack.Screen name="DogDetail" component={DogDetail} />
					<Stack.Screen name="Report" component={Report} />
					<Stack.Screen name="ReportDorList" component={ReportDorList} />
					<Stack.Screen name="PatrolMain" component={PatrolMain} />
					<Stack.Screen name="PatrolGo" component={PatrolGo} />
					{/* <Stack.Screen name="GoogleMap" component={GoogleMap} /> */}
					<Stack.Screen name="PatrolMap" component={PatrolMap} />
					<Stack.Screen name="PatrolLog" component={PatrolLog} />
					<Stack.Screen name="PatrolDiary" component={PatrolDiary} />
					<Stack.Screen name="PatrolDiaryWrite" component={PatrolDiaryWrite} />
					<Stack.Screen name="MissingMain" component={MissingMain} />
					<Stack.Screen name="MissingFind" component={MissingFind} />
					<Stack.Screen name="MissingDetail" component={MissingDetail} />
					<Stack.Screen name="CreateMissingDog" component={CreateMissingDog} />
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Register" component={Register} />
					<Stack.Screen name="PatrolLogDetail" component={PatrolLogDetail} />
					<Stack.Screen name="WalletMine" component={WalletMine} />
					<Stack.Screen name="CreateDog" component={CreateDog} />
					<Stack.Screen name="PrivateKey" component={PrivateKey} />
					<Stack.Screen name="UpdateInfo" component={UpdateInfo} />
					<Stack.Screen
						name="PatrolReportDetail"
						component={PatrolReportDetail}
					/>
					<Stack.Screen name="FindTogether" component={FindTogether} />
					<Stack.Screen name="ManualMain" component={ManualMain} />
					<Stack.Screen
						name="CreateMissingMyDog"
						component={CreateMissingMyDog}
					/>
					<Stack.Screen
						name="MissingCarouselDetail"
						component={MissingCarouselDetail}
					/>
					<Stack.Screen name="FindMissingDog" component={FindMissingDog} />
				</Stack.Navigator>
			</NavigationContainer>
		</RecoilRoot>
	);
};

export default App;

export type RootStateParamList = Record<string, undefined>;
export type StackNavigation = NavigationProp<RootStateParamList>;
