import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import PatrolDiaryWriteLayout from "../styles/patrolDiaryWriteLayout";

import img from "../../assets/images/debug-dog.png";
import PatrolLogCarousel from "../recycles/PatrolLogCarousel";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";
import CustomSubButton from "../recycles/CustomSubBtn";

const PatrolDiaryWrite = () => {
	const logs = [
		{ logNo: 0, imgSrc: img, date: "22-02-02" },
		{ logNo: 1, imgSrc: img, date: "22-02-02" },
		{ logNo: 2, imgSrc: img, date: "22-02-02" },
		{ logNo: 3, imgSrc: img, date: "22-02-02" },
		{ logNo: 4, imgSrc: img, date: "22-02-02" },
	];
	return (
		<>
			<CommonLayout>
				<ColorHeader title="순찰 일지 작성" />
				<View style={PatrolDiaryWriteLayout.container}>
					<View style={PatrolDiaryWriteLayout.titleWrap}>
						<Text style={PatrolDiaryWriteLayout.titleText}>
							순찰 기록을 클릭해{"\n"}
							<Text style={PatrolDiaryWriteLayout.titleTextColored}>
								순찰 일지 작성
							</Text>
							을 해보세요
						</Text>
					</View>
					<View style={PatrolDiaryWriteLayout.logWrap}>
						<PatrolLogCarousel logs={logs} />
					</View>
					<View style={PatrolDiaryWriteLayout.formWrap}>
						<TouchableOpacity
							activeOpacity={0.7}
							// onPress={pickImage}
						>
							<View style={PatrolDiaryWriteLayout.imageUploadWrap}>
								<Image source={AddPlusIcon} />
								<Text>사진 등록하기</Text>
							</View>
						</TouchableOpacity>
						<TextInput
							style={PatrolDiaryWriteLayout.formInput}
							// value={petSpecies || ""}
							onChangeText={() => {}}
							placeholder="제목을 작성해주세요."
							onBlur={() => {}}
						/>

						<View>
							<Text style={PatrolDiaryWriteLayout.textAlign}>
								순찰 일지 내용 작성
							</Text>
						</View>
						<TextInput
							style={[
								PatrolDiaryWriteLayout.formInput,
								PatrolDiaryWriteLayout.textDesc,
							]}
							// value={petSpecies || ""}
							onChangeText={() => {}}
							placeholder="순찰 일지 내용을 작성해주세요."
							onBlur={() => {}}
						/>
						<CustomSubButton
							text={"순찰일지 기록하기"}
							onPress={
								() => {}

								// navigation.navigate("MakeDogProfile")
							}
							color={"#70C8EE"}
						/>
					</View>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolDiaryWrite;
