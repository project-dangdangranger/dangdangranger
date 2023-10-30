import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";

const PatrolDiary = () => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="순찰 일지" />
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolDiary;
