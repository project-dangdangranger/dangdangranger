import { View, Text, Image, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import SideMenuIcon from "./SideMenuIcon";
import SideMenuLayout from "../styles/sideMenuLayout";
import templogo from "../../assets/images/templogo.png";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import OutPng from "../../assets/images/out.png";
import NftPng from "../../assets/images/nft_icon.png";
import MissingPng from "../../assets/images/missing_icon.png";
import PatrolPng from "../../assets/images/patrol_icon.png";

const SideMenu = (props: any) => {
	const navigation = useNavigation();
	const [tokn, setToken] = useState("");
	async function retrieveToken() {
		try {
			const token = await EncryptedStorage.getItem("accessToken");
			if (token !== undefined) {
				setToken(token);
				return token;
			}
		} catch (error) {
			// 에러가 발생했습니다.
			console.log(error);
		}
	}

	useEffect(() => {
		retrieveToken();
	}, []);

	return (
		<>
			<View style={SideMenuLayout.sideMenuWrap}>
				<View style={SideMenuLayout.sideMenuHeader}>
					<Text style={SideMenuLayout.sideMenuLogo}>댕댕레인저</Text>
					<TouchableOpacity activeOpacity={0.7} onPress={props.clickX}>
						<Image source={OutPng} />
					</TouchableOpacity>
				</View>

				<View style={SideMenuLayout.navWrap}>
					<Text style={SideMenuLayout.navTitle}>
						반려견 <Text style={SideMenuLayout.boldNavTitle}>소유증명</Text>
					</Text>
					<Text style={SideMenuLayout.navDesc}>간편한 방범대원증 NFT 발급</Text>
					<View style={SideMenuLayout.navFlex}>
						<SideMenuIcon
							title="방범대원 등록"
							imageIcon={NftPng}
							movePage="Profile"
						></SideMenuIcon>
					</View>
					<View style={{ marginTop: 25 }}></View>
					<Text style={SideMenuLayout.navTitle}>
						반려견과의 <Text style={SideMenuLayout.boldNavTitle}>순찰</Text>
					</Text>
					<Text style={SideMenuLayout.navDesc}>
						안전한 우리 동네에 함께 하세요.
					</Text>
					<View style={SideMenuLayout.navFlex}>
						<SideMenuIcon
							title="순찰하기"
							imageIcon={PatrolPng}
							movePage="PatrolMain"
						></SideMenuIcon>
						<SideMenuIcon
							title="실종견 찾기"
							imageIcon={MissingPng}
							movePage="MissingMain"
						></SideMenuIcon>
					</View>

					{tokn ? (
						<View style={SideMenuLayout.authButtonWrap}>
							<View style={SideMenuLayout.container}>
								<TouchableOpacity
									style={SideMenuLayout.btn}
									activeOpacity={0.7}
									onPress={() => {
										GoogleSignin.signOut();
										setToken("");
										navigation.navigate("Main");
									}}
								>
									<View style={SideMenuLayout.button}>
										<Text style={SideMenuLayout.text}>로그아웃</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
					) : (
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
					)}
				</View>
			</View>
		</>
	);
};

export default SideMenu;
