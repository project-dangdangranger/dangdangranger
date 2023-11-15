import PatrolBtn from "../components/PatrolBtn";
import ThreeBtn from "../components/ThreeBtn";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import PatrolNewBtn from "../components/PatrolNewBtn";

const PatrolGo = () => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="함께 순찰하기" />
				{/* <PatrolBtn /> */}
				<PatrolNewBtn />
				<ThreeBtn></ThreeBtn>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolGo;
