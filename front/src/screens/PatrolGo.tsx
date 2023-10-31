import PatrolStartBtn from "../components/PatrolStartBtn";
import PatrolStopBtn from "../components/PatrolStopBtn";
import ThreeBtn from "../components/ThreeBtn";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";

const PatrolGo = () => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="함께 순찰하기" />
				{/* <PatrolStartBtn></PatrolStartBtn> */}
				<PatrolStopBtn />
				<ThreeBtn></ThreeBtn>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolGo;
