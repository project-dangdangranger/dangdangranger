import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import PatrolStartImg from "../../assets/images/PatrolStart.png";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";

interface PatrolBtnProps {
	setPatrol: (active: boolean) => void;
}

const PatrolBtn: React.FC<PatrolBtnProps> = ({ setPatrol }) => {
	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity onPress={() => setPatrol(true)}>
					<Image style={styles.StartImg} source={PatrolStartImg}></Image>
				</TouchableOpacity>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	button: {
		width: responsiveWidth(70),
		backgroundColor: "#EE8A72",
		height: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 40,
	},
	rowcontainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	text: {
		fontSize: 17,
		fontWeight: "900",
		color: "#FFFFFF",
	},
	img: {
		width: 25,
		height: 30,
		position: "absolute",
		left: -35,
	},
	StartImg: {
		// marginBottom: 10,
		height: responsiveHeight(40),
		transform: [{ scale: 0.925 }],
	},
});

export default PatrolBtn;
