import { useEffect, useRef, useState } from "react";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import SockJS from "sockjs-client";
import { BASE_URL, SERVER_URL } from "../constants/constants";
import { Stomp } from "@stomp/stompjs";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Client } from "@stomp/stompjs";
import EncryptedStorage from "react-native-encrypted-storage";
import axios from "../utils/axios";

const FindTogether = (missingNo: number) => {
	const navigation = useNavigation();
	const stompClient: any = useRef({});
	const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
	// 같이 찾는 사람들의 위치 정보 저장
	const positons = new Map();
	const [myLatitude, setMyLatitude] = useState(123);
	const [myLongitude, setMyLongitude] = useState(345);
	const topicId: any = useRef();

	useEffect(() => {
		//return leavePage();
	}, []);

	// 서버 연결 및 구독 시작: 함께 찾기 시작
	const connectServer = async () => {
		if (stompClient.current !== undefined && stompClient.current.connected)
			return;
		console.log("hi server");
		let socket = new SockJS(`${SERVER_URL}/ws-stomp`);
		stompClient.current = Stomp.over(function () {
			return socket;
		});

		console.log("end server");

		await stompClient.current.connect({}, () => {
			connectRoom();
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
		if (!stompClient.current.connected) return;
		console.log("uuid: ", topicId.current);
		stompClient.current.subscribe(
			"/finddog/sub/" + topicId.current,
			receivedMessage,
		);
		stompClient.current.send(
			"/finddog",
			{},
			JSON.stringify({
				code: "ENTER",
				userNo: missingNo,
				topicId: topicId.current,
				param: {},
			}),
		);
		console.log("완료");
		startSending();
	};

	const startSending = () => {
		if (intervalId) return;
		if (stompClient.current === undefined || !stompClient.current.connected)
			return;

		const id = setInterval(() => {
			stompClient.current.send(
				"/finddog",
				{},
				JSON.stringify({
					code: "SHARE_CORDINATE",
					userNo: missingNo,
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
		const userId = parsedMessage.userId;
		const latitude = parsedMessage.latitude;
		const longitude = parsedMessage.longitude;
		positons.set(userId, { lat: latitude, lng: longitude });
	};

	// topic 구독 취소 및 세션 나가기: 함께 찾기 종료
	const disconnectServer = () => {
		if (intervalId) {
			clearInterval(intervalId);
			setIntervalId(undefined);
		}

		if (stompClient.current === undefined || !stompClient.current.connected)
			return;
		stompClient.current.unsubscribe("/finddog/sub/" + topicId.current);
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
				<TouchableOpacity onPress={() => findWith()}>
					<Text>방 입장</Text>
				</TouchableOpacity>
				<View>
					<Text>{positons.size}</Text>
					{Array.from(positons).map(([key, value]) => (
						<Text key={key}>
							{key}: {value.lat}, {value.lng}
						</Text>
					))}
				</View>
				<TouchableOpacity onPress={() => disconnectServer()}>
					<Text>나가기</Text>
				</TouchableOpacity>
			</CommonLayout>
		</>
	);
};

export default FindTogether;
