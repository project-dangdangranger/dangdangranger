import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import FourBtn from "../recycles/PetrolBtn";
import AbsoluteBar from "../recycles/FooterBar";
import Carousel from "../recycles/MultiPicture";

const PatrolMain = () => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="순찰" />
				<Carousel />
				<FourBtn />
			</CommonLayout>
			<AbsoluteBar />
		</>
	);
};

export default PatrolMain;
