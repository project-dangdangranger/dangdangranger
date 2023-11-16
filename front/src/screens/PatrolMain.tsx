import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import FourBtn from "../recycles/PetrolFourBtn";
import AbsoluteBar from "../recycles/FooterBar";
import Carousel from "../components/Carousel";
import { View, Text } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";

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
