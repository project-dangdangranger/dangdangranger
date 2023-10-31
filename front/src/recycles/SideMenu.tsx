import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SideMenuIcon from "./SideMenuIcon";
import SideMenuLayout from "../styles/sideMenuLayout";
import templogo from "../../assets/images/templogo.png";

const SideMenu = (props: any) => {
	const navigation = useNavigation();
	console.log(props.clickX);
	return (
		<>
			<View style={SideMenuLayout.sideMenuWrap}>
				<View style={SideMenuLayout.sideMenuHeader}>
					<Text style={SideMenuLayout.sideMenuLogo}>댕댕레인저</Text>
					<TouchableOpacity activeOpacity={0.7} onPress={props.clickX}>
						<Image source={templogo} />
					</TouchableOpacity>
				</View>

				<View style={SideMenuLayout.navWrap}>
					<Text style={SideMenuLayout.navTitle}>
						반려견 <Text style={SideMenuLayout.boldNavTitle}>소유증명</Text>
					</Text>
					<Text style={SideMenuLayout.navDesc}>
						간편한 NFT 소유증명 및 이전
					</Text>
					<View style={SideMenuLayout.navFlex}>
						<SideMenuIcon
							title="나의 프로필"
							imageIcon={templogo}
							movePage="Profile"
						></SideMenuIcon>
					</View>
					<View style={{ marginTop: 25 }}></View>
					<Text style={SideMenuLayout.navTitle}>
						반려견과의 <Text style={SideMenuLayout.boldNavTitle}>추억공유</Text>
					</Text>
					<Text style={SideMenuLayout.navDesc}>소중한 추억을 간직하세요.</Text>
					<View style={SideMenuLayout.navFlex}>
						<SideMenuIcon
							title="포토앨범"
							imageIcon={templogo}
							movePage="Album"
						></SideMenuIcon>
						<SideMenuIcon
							title="진료일정등록"
							imageIcon={templogo}
						></SideMenuIcon>
						<SideMenuIcon
							title="산책기록"
							imageIcon={templogo}
							movePage="Walk"
						></SideMenuIcon>
						<SideMenuIcon
							title="하늘공원"
							imageIcon={templogo}
							movePage="Three"
						></SideMenuIcon>
						<SideMenuIcon
							title="신고하기"
							imageIcon={templogo}
							movePage="Report"
						/>
					</View>

					<View style={SideMenuLayout.authButtonWrap}>
						<View style={SideMenuLayout.container}>
							<TouchableOpacity
								style={SideMenuLayout.btn}
								activeOpacity={0.7}
								onPress={() => navigation.navigate("Login")}
							>
								<View style={SideMenuLayout.button}>
									<Text style={SideMenuLayout.text}>로그인</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
		</>
	);
};

export default SideMenu;
