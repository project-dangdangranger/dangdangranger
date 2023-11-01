import { Text, View } from "react-native";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import PatrolDiaryWriteLayout from "../styles/patrolDiaryWriteLayout";

const PatrolDiaryWrite = () => {
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
					<View
						style={[
							PatrolDiaryWriteLayout.logWrap,
							PatrolDiaryWriteLayout.debug,
						]}
					></View>
					<View
						style={[
							PatrolDiaryWriteLayout.formWrap,
							PatrolDiaryWriteLayout.debug,
						]}
					></View>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolDiaryWrite;
