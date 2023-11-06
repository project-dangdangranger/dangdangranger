import { useRef } from "react";
import ColorHeader from "../recycles/ColorHeader";
import CommonLayout from "../recycles/CommonLayout";
import SockJS from "sockjs-client";

const FindTogether = (missingNo: number) => {
	const stompClient: any = useRef({});

	const connectServer = () => {
		if (stompClient.current !== undefined && stompClient.current.connected)
			return;
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
