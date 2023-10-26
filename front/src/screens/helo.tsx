import { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	Platform,
	Alert,
	TouchableWithoutFeedback,
	ScrollView,
	TouchableHighlight,
} from "react-native";
import DatePickerIcon from "../../assets/images/date-picker-icon.png";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";
import PhotoImg from "../../assets/images/photo-ex-img4.png";
import CreateProfileLayout from "../styles/createProfileLayout";
import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import Footer from "../recycles/Footer";
import FooterBar from "../recycles/FooterBar";

const CreateProfile = ({ navigation }: any) => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="프로필 작성" />
				<View style={CreateProfileLayout.createProfileTitleWrap}>
					<Text style={CreateProfileLayout.createProfileDesc}>반려견 NFT</Text>
					<Text style={CreateProfileLayout.createProfileTitle}>
						내 NFT에 저장하는,{"\n"}
						나의 반려견
					</Text>
				</View>
				<TouchableOpacity
					activeOpacity={0.7}
					// onPress={pickImage}
				>
					<View style={CreateProfileLayout.imageUploadWrap}>
						<Image source={AddPlusIcon} />
						<Text>사진 등록하기</Text>
					</View>
				</TouchableOpacity>

				<Text style={CreateProfileLayout.formTitle}>
					반려견의 이름을 입력해주세요.
				</Text>

				<View style={CreateProfileLayout.formWrap}>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 이름을 입력해주세요.
					</Text>
					<TextInput
						style={CreateProfileLayout.formInput}
						// onChangeText={(text) => setPetName(text)}
						// value={petName}
					/>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 종을 입력해주세요.
					</Text>

					<Text style={CreateProfileLayout.formTitle}>
						반려견의 성별을 입력해주세요.
					</Text>
				</View>

				<Footer />
			</CommonLayout>
		</>
	);
};

export default CreateProfile;
