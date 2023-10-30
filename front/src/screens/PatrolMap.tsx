import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";

const PatrolMap = () => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="전국 순찰 기록" />
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolMap;
