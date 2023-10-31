import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";

const WRITE_YOUR_NAME = () => {
	return (
		<>
			<CommonLayout>
				<ColorHeader title="PAGE_NAME" />
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default WRITE_YOUR_NAME;
