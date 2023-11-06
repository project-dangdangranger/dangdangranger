import { useRef } from "react";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import SockJS from "sockjs-client";
import { BASE_URL } from "../constants/constants";
import { Stomp } from "@stomp/stompjs";

const FindTogether = (missingNo: number) => {
	const stompClient: any = useRef({});

	const connectServer = async () => {
		if (stompClient.current !== undefined && stompClient.current.connected)
			return;
		let socket = new SockJS(`${BASE_URL}/ws-stomp`);
		stompClient.current = Stomp.over(socket);

		await stompClient.current.connect({}, () => {});
	};

	const connectRoom = () => {
		if (!stompClient.current.connected) return;
		stompClient.current.subscribe("sub/find/room" + missingNo);
	};

	const receivedMessage = (message: any) => {
		const parsedMessage = JSON.parse(message.body);
		const userId = parsedMessage.userId;
		const latitude = parsedMessage.latitude;
		const longitude = parsedMessage.longitude;
	};

	const disconnectServer = () => {};

	return (
		<>
			<CommonLayout>
				<ColorHeader title="함께 찾기" />
			</CommonLayout>
		</>
	);
};

export default FindTogether;
