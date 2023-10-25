import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import TempPng from "../../assets/images/templogo.png";

const AbsoluteVar = () => {
	return (
		<>
			<View style={styles.container}>
				<View>
					<TouchableOpacity style={styles.btnCenter}>
						<Image source={TempPng} style={styles.btnImg} />
						<Text>Home</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity>
						<Image source={TempPng} style={styles.btnImg} />
						<Text>순찰</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity>
						<Image source={TempPng} style={styles.btnImg} />
						<Text>실종견</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity>
						<Image source={TempPng} style={styles.btnImg} />
						<Text>프로필</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default AbsoluteVar;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#ffff00",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: responsiveWidth(10),
		paddingVertical: responsiveWidth(2),
		// marginHorizontal: responsiveWidth(0),
		alignItems: "center",
	},
	btnCenter: {
		alignItems: "center",
		justifyContent: "center",
	},
	btnImg: {
		height: 35,
		width: 35,
	},
});
