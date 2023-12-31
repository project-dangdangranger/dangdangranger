import { useEffect, useRef, useState, useCallback } from "react";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import SockJS from "sockjs-client";
import { BASE_URL, SERVER_URL } from "../constants/constants";
import { Stomp } from "@stomp/stompjs";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "../utils/axios";
import FindMap from "../components/FindMap";
import FindBtn from "../components/FindBtn";
import FindSideBtn from "../components/FindSideBtn";
import Geolocation from "@react-native-community/geolocation";
import DetailModal from "../components/DetailModal";

const FindTogether = ({ route }: any) => {
	const navigation = useNavigation();
	const stompClient: any = useRef({});
	// const [intervalId.current, setintervalId.current] = useState<NodeJS.Timeout>();
	const intervalId = useRef();
	const renderIntervalId = useRef();
	// 같이 찾는 사람들의 위치 정보 저장
	const [positions, setPositions] = useState(new Map());
	const [myLatitude, setMyLatitude] = useState();
	const [myLongitude, setMyLongitude] = useState();
	const [detailMissingDog, setDetailMissingDog] = useState({});
	const [dogInfo, setDogInfo] = useState({});
	const [isPressed, setIsPressed] = useState(false);
	// const [topicId, setTopicId] = useState("");
	const topicId: any = useRef();
	const { item } = route.params;
	const [isCurrentLocation, setIsCurrentLocation] = useState(false);

	// 사용자 데이터 조회
	const [ProfileData, setProfileData] = useState<any>([]);
	// 찾는 사용자 리스트
	const findingList = useRef(new Map());
	// 신고 현황 리스트
	const reportList = useRef(new Array());
	const reportIntervalId = useRef<any>();

	const [modalVisible, setModalVisible] = useState(false);

	const [render, setRender] = useState(true);

	useFocusEffect(
		useCallback(() => {
			return () => {
				console.log("useFocusEffect");
				console.log("topicId.current", topicId.current);
				console.log("detailMissingDog.missingNo", detailMissingDog.missingNo);
				console.log("ProfileData.userNo", ProfileData.userNo);
				console.log("ProfileData.userName", ProfileData.userName);

				disconnectServer();
			};
		}, [ProfileData, detailMissingDog]),
	);

	useEffect(() => {
		// 사용자 정보 조회
		axios.get("/user").then((data) => {
			setProfileData(data.data.data);
			// console.log("유저들어가:", data);
		});
		// 실종 정보 조회
		getDetailMissingDog(item.missingNo);
		// 발견 신고 조회
		axios.get(`/searchreport?missingNo=${item.missingNo}`).then((data) => {
			console.log("searchreport", data.data.data);
			reportList.current = data.data.data;
		});
	}, []);

	useEffect(() => {
		if (detailMissingDog && isPressed) {
			connectServer();

			// 발견 신고 조회
			reportIntervalId.current = setInterval(() => {
				axios.get(`/searchreport?missingNo=${item.missingNo}`).then((data) => {
					console.log("searchreport", data.data.data);
					reportList.current = data.data.data;
				});
			}, 3000);
		}
	}, [detailMissingDog, isPressed]);

	const getTopicId = async () => {
		console.log("detailMissingDog : ", detailMissingDog);
		console.log("토픽 아이디 : ", detailMissingDog.topicId);
		topicId.current = detailMissingDog.topicId;
		if (detailMissingDog.topicId === null) {
			console.log("토픽아이디 널값인 상태임");
			const response = await axios.post("/finddog", {
				missingNo: detailMissingDog.missingNo,
			});
			topicId.current = response.data.data.topicId;
		}
	};

	const getDetailMissingDog = async (missingNo: number) => {
		const response = await axios.get(`/missing/${missingNo}`);
		setDetailMissingDog(response.data.data);

		getDogInfo(response.data.data.dogNo);
	};

	const getDogInfo = async (dogNo: number) => {
		const response = await axios.get(`/dog/${dogNo}`);
		setDogInfo(response.data.data);
	};

	// 서버 연결 및 구독 시작: 함께 찾기 시작
	const connectServer = async () => {
		await getTopicId();

		if (stompClient.current !== undefined && stompClient.current.connected)
			return;
		let socket = new SockJS(`${SERVER_URL}/ws-stomp`);
		stompClient.current = Stomp.over(function () {
			return new SockJS(`${SERVER_URL}/ws-stomp`);
		});
		console.log(`${SERVER_URL}/ws-stomp`);

		await stompClient.current.connect({}, () => {
			setTimeout(function () {
				console.log(stompClient.current.connected);
				connectRoom();
			}, 500);
		});
	};

	// const findWith = async () => {
	// 	const response = await axios.post("/finddog", { missingNo: 12 });
	// 	console.log(response.data.data.topicId);
	// 	topicId.current = response.data.data.topicId;
	// 	await connectServer();
	// };

	// topic 구독 내부 함수
	const connectRoom = async () => {
		console.log(`connectRoom start`);
		if (!stompClient.current.connected) return;
		console.log("uuid: ", topicId.current);
		stompClient.current.subscribe(
			"/sub/finddog/" + topicId.current,
			receivedMessage,
		);
		stompClient.current.send(
			"/pub/finddog",
			{},
			JSON.stringify({
				code: "ENTER",
				userNo: ProfileData.userNo,
				userName: ProfileData.userName,
				topicId: topicId.current,
				missingNo: detailMissingDog.missingNo,
				param: {}, // 좌표주고받을때 씀, 위경도를. 현재 자기위치도 보내야함
			}),
		);
		console.log("완료");
		startSending();
	};

	const handleEndSession = () => {
		disconnectServer();
		navigation.navigate("FindMissingDog", {
			missingNo: detailMissingDog.missingNo,
			myLatitude,
			myLongitude,
		});
	};

	const startSending = () => {
		console.log(`startSending`);
		if (intervalId.current) return;
		if (stompClient.current === undefined || !stompClient.current.connected)
			return;

		const id = setInterval(() => {
			console.log("Getting location...");
			getGeoLocation((latitude, longitude) => {
				console.log("myLatitude : ", latitude);
				console.log("myLongitude : ", longitude);
				console.log(topicId.current);

				if (stompClient.current === undefined || !stompClient.current.connected)
					return;

				stompClient.current.send(
					"/pub/finddog",
					{},
					JSON.stringify({
						code: "SHARE_COORDINATE",
						userNo: ProfileData.userNo,
						userName: ProfileData.userName,
						topicId: topicId.current,
						missingNo: detailMissingDog.missingNo,
						param: {
							latitude: latitude,
							longitude: longitude,
						},
					}),
				);
			});
		}, 3000);
		intervalId.current = id;

		const renderId = setInterval(() => {
			setRender((prev) => !prev);
		}, 2000);

		renderIntervalId.current = renderId;
	};

	const getGeoLocation = (callback) => {
		Geolocation.getCurrentPosition(
			(position) => {
				const latitude = Number(JSON.stringify(position.coords.latitude));
				const longitude = Number(JSON.stringify(position.coords.longitude));
				setMyLatitude(latitude);
				setMyLongitude(longitude);
				console.log("getGeoLocation: ", latitude, longitude);
				callback(latitude, longitude); // 콜백 호출
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000 },
		);
	};

	// 상대방 위치 업데이트
	const receivedMessage = (message: any) => {
		const parsedMessage = JSON.parse(message.body);
		console.log("receivedMessage : ", parsedMessage);
		const code = parsedMessage.code;
		const userNo = parsedMessage.userNo;
		const userName = parsedMessage.userName;

		switch (code) {
			case "ENTER":
				break;
			case "SHARE_COORDINATE":
				const latitude = Number(parsedMessage.param.latitude);
				const longitude = Number(parsedMessage.param.longitude);
				findingList.current.set(userNo, {
					userNo: userNo,
					userName: userName,
					lat: latitude,
					lng: longitude,
				});
				break;
			case "EXIT":
				findingList.current.delete(userNo);
				break;
		}
	};
	// topic 구독 취소 및 세션 나가기: 함께 찾기 종료
	const disconnectServer = () => {
		console.log("called disconnectServer");
		if (intervalId.current) {
			clearInterval(intervalId.current);
			intervalId.current = undefined;
		}
		if (renderIntervalId.current) {
			clearInterval(renderIntervalId.current);
			renderIntervalId.current = undefined;
		}

		// 신고 현황 실시간 조회 종료
		if (reportIntervalId.current) {
			clearInterval(reportIntervalId.current);
			reportIntervalId.current = undefined;
		}

		const message = JSON.stringify({
			code: "EXIT",
			userNo: ProfileData.userNo,
			userName: ProfileData.userName,
			topicId: topicId.current,
			missingNo: detailMissingDog.missingNo,
		});

		// 종료 메시지 전송
		if (stompClient.current === undefined || !stompClient.current.connected)
			return;
		stompClient.current.send("/pub/finddog", {}, message);
		stompClient.current.unsubscribe("/sub/finddog/" + topicId.current);
		stompClient.current.disconnect();
		findingList.current.clear();
		setIsPressed(!isPressed);
	};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="함께 찾기" />
				{/*<TouchableOpacity onPress={() => findWith()}>
					<Text>방 입장</Text>
				</TouchableOpacity>
				<View>
					<Text>{positions.size}</Text>
					{Array.from(positions).map(([key, value]) => (
						<Text key={key}>
							{key}: {value.lat}, {value.lng}
						</Text>
					))}
				</View>
				<TouchableOpacity onPress={() => disconnectServer()}>
					<Text>나가기</Text>
					</TouchableOpacity>*/}

				{Object.keys(detailMissingDog).length !== 0 ? (
					<FindMap
						missingNo={detailMissingDog.missingNo}
						missingLat={Number(detailMissingDog.missingLat)}
						missingLng={Number(detailMissingDog.missingLng)}
						myUserNo={ProfileData.userNo}
						findingList={findingList.current}
						reportList={reportList.current}
						isCurrentLocation={isCurrentLocation}
						setIsCurrentLocation={setIsCurrentLocation}
					/>
				) : null}
				<FindBtn
					startSession={() => {}}
					endSession={() => handleEndSession()}
					isPressed={isPressed}
					setIsPressed={setIsPressed}
				/>
				<FindSideBtn
					endSession={handleEndSession}
					isFinding={isPressed}
					setMissingModal={setModalVisible}
					disconnectServer={disconnectServer}
					setIsCurrentLocation={setIsCurrentLocation}
				/>
				<DetailModal
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
					missingInfo={detailMissingDog}
					dogInfo={dogInfo}
				/>
			</CommonLayout>
		</>
	);
};

export default FindTogether;
