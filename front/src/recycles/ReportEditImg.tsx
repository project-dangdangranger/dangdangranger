import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import AlbumLayout from "../styles/albumLayout";
import TempProfileImg from "../../assets/images/dog1.jpg";
import WhitePenIcon from "../../assets/images/icon_Image_.png";
import CameraIcon from "../../assets/images/icon_camera_.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import { useState } from "react";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import Noimg from "../../assets/images/noimage.png";

const EditImage = ({
	selectedImg,
	setSelectedImg,
	patrolImgList,
	setPatrolImgList,
}: any) => {
	const handleChoosePhoto = () => {
		const options = {
			storageOptions: {
				skipBackup: true,
				path: "images",
			},
		};

		launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else if (response.assets && response.assets.length > 0) {
				const source = { uri: response.assets[0].uri };

				setSelectedImg(source.uri); // 부모 컴포넌트의 상태 업데이트
				setPatrolImgList([...patrolImgList, source.uri]);
			}
		});
	};
	const handleTakePhoto = () => {
		const options = {
			storageOptions: {
				skipBackup: true,
				path: "images",
			},
		};

		launchCamera(options, (response) => {
			if (response.didCancel) {
				console.log("User cancelled camera picker");
			} else if (response.error) {
				console.log("CameraPicker Error: ", response.error);
			} else if (response.assets && response.assets.length > 0) {
				const source = { uri: response.assets[0].uri };

				setSelectedImg(source.uri); // 부모 컴포넌트의 상태 업데이트
				setPatrolImgList([...patrolImgList, source.uri]);
			}
		});
	};

	return (
		<>
			<View style={styles.profileWrap}>
				<Image
					source={selectedImg ? { uri: selectedImg } : Noimg}
					style={styles.userPhoto}
				/>
				{patrolImgList.length < 3 && (
					<TouchableOpacity
						activeOpacity={0.7}
						style={styles.changeImageWrap}
						onPress={handleChoosePhoto}
					>
						<View>
							<Image source={WhitePenIcon} style={styles.changeImageIcon} />
						</View>
					</TouchableOpacity>
				)}
			</View>
			<TouchableOpacity
				activeOpacity={0.7}
				style={styles.changeImageWrap2}
				onPress={handleTakePhoto}
			>
				<View>
					<Image source={CameraIcon} style={styles.changeImageIcon} />
				</View>
			</TouchableOpacity>
		</>
	);
};

export default EditImage;
const styles = StyleSheet.create({
	profileWrap: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: responsiveWidth(4),
		position: "relative",
	},
	myNameTitle: {
		fontSize: 22,
		fontWeight: "600",
		color: "#5B5B5B",
		textAlign: "center",
	},
	changeImageWrap: {
		padding: 8,
		borderRadius: 50,
		backgroundColor: "#3E6DCA",
		position: "absolute",
		bottom: 0,
		right: responsiveWidth(35),
	},
	changeImageWrap2: {
		padding: 8,
		borderRadius: 50,
		backgroundColor: "#3E6DCA",
		position: "absolute",
		bottom: 0,
		right: responsiveWidth(55),
	},
	changeImageIcon: {
		width: 18,
		height: 18,
		resizeMode: "contain",
	},
	userPhoto: {
		position: "relative",
		width: 120,
		height: 120,
		borderRadius: 100,
		marginTop: 20,
	},
});
