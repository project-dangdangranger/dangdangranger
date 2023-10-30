import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TextInput,
} from "react-native";
// import GestureFlipView from "../components/GestureFlipView";
import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import AbsoluteVar from "../recycles/FooterBar";
import CustomText from "../recycles/CustomText";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomSubButton from "../recycles/CustomSubBtn";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";

const Profile = ({ navigation }: any) => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="강아지 관리" />
				<View>
					<CustomText
						mainText="방범대원증을"
						emphasizedText="NFT"
						emphasizedColor="#3D6CC9"
						finalText="로 등록해보세요"
					/>
				</View>
				<View style={styles.viewcontainer}>
					<TouchableOpacity
						activeOpacity={0.7}
						// onPress={pickImage}
					>
						<View style={styles.imageUploadWrap}>
							<Image source={AddPlusIcon} />
							<Text>사진 등록하기</Text>
						</View>
					</TouchableOpacity>
					<View>
						<Text style={styles.textAlign}>반려견의 이름을 입력해주세요.</Text>
					</View>
					<TextInput
						style={styles.formInput}
						// value={petSpecies || ""}
						onChangeText={() => {}}
						placeholder="반려견 이름을 입력해주세요."
						onBlur={() => {}}
					/>

					<View>
						<Text style={styles.textAlign}>반려견의 종을 입력해주세요.</Text>
					</View>
					<TextInput
						style={styles.formInput}
						// value={petSpecies || ""}
						onChangeText={() => {}}
						placeholder="반려견 종을 입력해주세요."
						onBlur={() => {}}
					/>

					<View>
						<Text style={styles.textAlign}>반려견의 이름을 입력해주세요.</Text>
					</View>
					<TextInput
						style={[styles.formInput]}
						// value={petSpecies || ""}
						onChangeText={() => {}}
						placeholder="종을 검색해 아래를 클릭하세요"
						onBlur={() => {}}
					/>

					<View>
						<Text style={styles.textAlign}>반려견의 생일을 입력해주세요.</Text>
					</View>
					<TextInput
						style={[styles.formInput, { marginBottom: responsiveHeight(2) }]}
						// value={petSpecies || ""}
						onChangeText={() => {}}
						placeholder="종을 검색해 아래를 클릭하세요"
						onBlur={() => {}}
					/>
				</View>

				<CustomSubButton
					text={"NFT 반려대원 발급하기"}
					onPress={
						() => {}

						// navigation.navigate("MakeDogProfile")
					}
					color={"#70C8EE"}
				/>
			</CommonLayout>
			<AbsoluteVar />
		</>
	);
};

export default Profile;

const styles = StyleSheet.create({
	viewcontainer: {
		justifyContent: "center",
		alignItems: "center",
		// marginVertical: responsiveHeight(12),
	},
	imgcontainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(5),
	},
	imageUploadWrap: {
		width: responsiveWidth(85),
		height: 110,
		borderWidth: 2,
		borderColor: "#E1E1E1",
		borderRadius: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 24,
	},
	formInput: {
		width: responsiveWidth(85),
		height: 36,
		borderWidth: 1,
		borderColor: "#9D9D9D",
		borderRadius: 2,
		marginTop: 7,
		padding: 6,
	},
	textAlign: {
		marginTop: responsiveHeight(2),
		textAlign: "left",
		width: responsiveWidth(85),
	},
});
