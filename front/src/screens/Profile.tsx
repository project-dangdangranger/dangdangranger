import { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import AlbumLayout from "../styles/albumLayout";
import FourBtn from "../recycles/FourBtn";
import AbsoluteVar from "../recycles/FooterBar";
import axios from "../utils/axios";

const Profile = ({ route, navigation }: any) => {
	const [ProfileData, setProfileData] = useState<any>([]);

	useEffect(() => {
		axios.get("/user").then((data) => {
			setProfileData(data.data.data);
		});
	}, []);

	useEffect(() => {
		if (route.params?.updated) {
			axios.get("/user").then((data) => {
				setProfileData(data.data.data);
			});
		}
	}, [route.params]);

	return (
		<>
			<CommonLayout>
				<ColorHeader title="나의 프로필" />
				<View>
					<View style={AlbumLayout.profileWrap}>
						<Image
							source={{ uri: ProfileData.userProfileImg }}
							// source={TempProfileImg}
							style={AlbumLayout.userPhoto}
						/>
					</View>
					<View style={AlbumLayout.userColcontainer}>
						<View style={AlbumLayout.userContainer}>
							<Text style={AlbumLayout.userContainerText}>
								{ProfileData.userName} 님
							</Text>
							<TouchableOpacity style={AlbumLayout.btnCSS1}>
								<Text style={AlbumLayout.userContainerText1}>정보 검색</Text>
							</TouchableOpacity>
						</View>
						<View style={AlbumLayout.userContainer}>
							<Text style={AlbumLayout.userContainerText2}>
								{ProfileData.userAddress}
							</Text>
						</View>
						<View style={AlbumLayout.DividSection}>
							<View style={AlbumLayout.userSectionDivid}></View>
						</View>
					</View>
				</View>
				<FourBtn />
			</CommonLayout>
			<AbsoluteVar />
		</>
	);
};

export default Profile;
