import { useEffect, useRef, useState } from "react";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import SockJS from "sockjs-client";
import { BASE_URL, SERVER_URL } from "../constants/constants";
import { Stomp } from "@stomp/stompjs";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "../utils/axios";
import GoogleMap from "./GoogleMap";
import FindMap from "../components/FindMap";
import FindBtn from "../components/FindBtn";
import FindSideBtn from "../components/FindSideBtn";
// const PatrolReportDetail = ({ route }: any) => {
//     // console.log("라우트!!!!!!", route.params);
//     const { navigate } = useNavigation();
//     const { missingNo, imgUrl } = route.params;

const FindTogether = ({ route }: any) => {
	const { navigate } = useNavigation();
	// const { missingNo, imgUrl } = route.params;
	// weoqirqwopejqwioasd {
	// "item": {"dogNo": 10,
	// "missingAddress": "1650 Amphitheatre Pkwy, Mountain View, CA 94043 미국",
	// "missingDate": "2023-11-08T03:31:00",
	// "missingLat": 37.422,
	// "missingLng": -122.084,
	// "missingNo": 66,
	// "missingTitle": "어떻게 해야 하나요..",
	// "missingTypeNo": 1,
	// "thumbnailUrl": "https://dangdangranger.s3.ap-northeast-2.amazonaws.com/profile_2023-11-14T04%3A25%3A57.900Z_68946969.png"}
	// }

	const navigation = useNavigation();
	const stompClient: any = useRef({});
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
	// 같이 찾는 사람들의 위치 정보 저장
	const [positions, setPositions] = useState(new Map());
	const [myLatitude, setMyLatitude] = useState(123);
	const [myLongitude, setMyLongitude] = useState(345);
	const [detailMissingDog, setDetailMissingDog] = useState({});
	const [isPressed, setIsPressed] = useState(false);
	const topicId: any = useRef();
	const { item } = route.params;

	const findingList = [
		{ userNo: 1, lat: 37.501, lng: 127.0386 },
		{ userNo: 2, lat: 37.5024, lng: 127.0392 },
		{ userNo: 3, lat: 37.4998, lng: 127.0372 },
	];

	useEffect(() => {
		getDetailMissingDog(item.missingNo);
	}, []);

	useEffect(() => {
		if (detailMissingDog && isPressed) {
			console.log("detailMissingDog : ", detailMissingDog);
			console.log("토픽 아이디 : ", detailMissingDog.topicId);
			if (detailMissingDog.topicId === null) {
				console.log("토픽아이디 널값인 상태임");
				getTopicId();
			}
		}
	}, [detailMissingDog, isPressed]);

	const getTopicId = async () => {};

	const getDetailMissingDog = async (missingNo: number) => {
		const response = await axios.get(`/missing/${missingNo}`);
		setDetailMissingDog(response.data.data);
	};

	// 서버 연결 및 구독 시작: 함께 찾기 시작
	const connectServer = async () => {
		if (stompClient.current !== undefined && stompClient.current.connected)
			return;
		let socket = new SockJS(`${SERVER_URL}/ws-stomp`);
		stompClient.current = Stomp.over(function () {
			return new SockJS(`${SERVER_URL}/ws-stomp`);
		});
		console.log(`${SERVER_URL}/ws-stomp`);

		console.log("end server");

		await stompClient.current.connect({}, () => {
			setTimeout(function () {
				console.log(stompClient.current.connected);
				connectRoom();
			}, 500);
		});
	};

	const findWith = async () => {
		const response = await axios.post("/finddog", { missingNo: 12 });
		console.log(response.data.data.topicId);
		topicId.current = response.data.data.topicId;
		await connectServer();
	};

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
				userNo: 12,
				topicId: topicId.current,
				param: {}, // 좌표주고받을때 씀, 위경도를. 현재 자기위치도 보내야함
			}),
		);
		console.log("완료");
		startSending();
	};

	const startSending = () => {
		console.log(`startSending`);
		if (intervalId) return;
		if (stompClient.current === undefined || !stompClient.current.connected)
			return;

		const id = setInterval(() => {
			stompClient.current.send(
				"/pub/finddog",
				{},
				JSON.stringify({
					code: "SHARE_COORDINATE",
					userNo: 12,
					topicId: topicId.current,
					param: {
						latitude: myLatitude,
						longitude: myLongitude,
					},
				}),
			);
		}, 5000);

		setIntervalId(id);
	};

	// 상대방 위치 업데이트
	const receivedMessage = (message: any) => {
		const parsedMessage = JSON.parse(message.body);
		const userNo = parsedMessage.userNo;
		const latitude = parsedMessage.param.latitude;
		const longitude = parsedMessage.param.longitude;
		setPositions(
			new Map(positions).set(userNo, { lat: latitude, lng: longitude }),
		);
	};

	// topic 구독 취소 및 세션 나가기: 함께 찾기 종료
	const disconnectServer = () => {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(undefined);
		}

		if (stompClient.current === undefined || !stompClient.current.connected)
			return;
		stompClient.current.unsubscribe("/sub/finddog/" + topicId.current);
		stompClient.current.disconnect();
	};

	// 페이지 벗어날 시 경고창
	const leavePage = () => {
		navigation.addListener("beforeRemove", (e) => {
			e.preventDefault();
			Alert.alert("친구 찾기 종료할 거?", "진짜 할 꺼?", [
				{
					text: "응 나 T야",
					onPress: () => {
						disconnectServer();
						navigation.dispatch(e.data.action);
					},
				},
				{
					text: "그래 이게 F지",
				},
			]);
		});
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
				<FindMap
					missingNo={9}
					missingLat={37.5}
					missingLng={127.03}
					findingList={findingList}
				/>
				<FindBtn
					startSession={() => Alert.alert("강아지를 찾아봅시다")}
					endSession={() => Alert.alert("이걸 못찾네")}
					isPressed={isPressed}
					setIsPressed={setIsPressed}
				/>
				<FindSideBtn />
			</CommonLayout>
		</>
	);
};

export default FindTogether;
