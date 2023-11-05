import { Text, View, Image, TouchableOpacity, Modal } from "react-native";
import CommonLayout from "../recycles/CommonLayout";
import FooterBar from "../recycles/FooterBar";
import ColorHeader from "../recycles/ColorHeader";
import axios from "../utils/axios";
import { useEffect, useState } from "react";
import styles from "../styles/PatrolReportDetailLayout";
import exImg from "../../assets/images/photo-ex-img1.png";
import ReportUserInfo from "../components/ReportUserInfo";
import dotIconImg from "../../assets/images/3-dot-icon.png";
import PatrolDiaryLayout from "../styles/patrolDiaryLayout";
import { responsiveHeight } from "react-native-responsive-dimensions";

const PatrolReportDetail = ({ route }: any) => {
	const [data, setData] = useState({});
	const { patrolNo } = route.params;
	const [userData, setUserData] = useState({});
	const [modalVisible, setModalVisible] = useState(false);

	useEffect(() => {
		axios
			.get(`/patrol/${patrolNo}`)
			.then((res) => {
				if (res.data.message === "순찰일지 상세조회 완료") {
					setData(res.data.data);
					console.log(res.data.data);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	useEffect(() => {
		axios
			.get("/user")
			.then((res) => {
				setUserData(res.data.data);
				// console.log(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			<Modal
				animationType="fade"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
			>
				<TouchableOpacity
					style={styles.modalContainer}
					onPress={() => setModalVisible(false)}
				>
					<View style={[styles.modalView]}>
						<TouchableOpacity
							style={styles.modalItem}
							onPress={() => {
								navigate("PatrolDiaryWrite");
								setModalVisible(false);
							}}
						>
							<Text style={PatrolDiaryLayout.modalText}>글 수정하기</Text>
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			</Modal>
			<CommonLayout>
				<ColorHeader title={"순찰 상세 기록"} />

				{/* {uri: data?.patrolLogImageUr} */}
				<Image source={exImg} style={styles.img}></Image>

				<View style={styles.mainContainer}>
					<View style={styles.contentContainer}>
						<View style={styles.mainTextContainer}>
							<Text style={styles.mainText}>{data?.patrolReportTitle}</Text>
						</View>
					</View>
					<ReportUserInfo data={data} userData={userData} />

					<View style={styles.contentcontainer}>
						<View style={styles.contentText}>
							<Text style={styles.contenttext}>
								{data?.patrolReportContent}
							</Text>
						</View>
						<View style={styles.editContainer}>
							<TouchableOpacity
								onPress={() => {
									setModalVisible(true);
								}}
							>
								<Image style={styles.threedot} source={dotIconImg}></Image>
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.commentcontainer}>
						<View style={styles.commentMainContainer}>
							<View style={{ flexDirection: "row" }}>
								<Text style={styles.commentText}>댓글</Text>
								<Text style={styles.commentCount}>
									{data.patrolComments?.length}
								</Text>
							</View>

							<TouchableOpacity style={styles.commentwrite}>
								<Text style={styles.commentwriteText}>댓글 작성</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</CommonLayout>
			<FooterBar />
		</>
	);
};

export default PatrolReportDetail;
