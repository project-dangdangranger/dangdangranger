import { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Alert,
	Platform,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";
import { ethers } from "ethers";
import EncryptedStorage from "react-native-encrypted-storage";
import { S3 } from "aws-sdk";
import {
	AWS_ACCESS_KEY,
	AWS_SECRET_ACCESS_KEY,
	AWS_REGION,
	AWS_BUCKET,
	POLYGON_API_KEY,
	MINT_DOG_TOKEN_ADDRESS,
} from "@env";

import { mintDogTokenContract } from "../contracts/contract";
import axiosApi from "../utils/axios";
import axios from "axios";
import RNFS from "react-native-fs";

import CommonLayout from "../recycles/CommonLayout";
import ColorHeader from "../recycles/ColorHeader";
import AbsoluteVar from "../recycles/FooterBar";
import CustomText from "../recycles/CustomText";
import {
	responsiveHeight,
	responsiveWidth,
} from "react-native-responsive-dimensions";
import CustomSubButton from "../recycles/CustomSubBtn";
import AddPlusIcon from "../../assets/images/add-plus-icon.png";
import CreateProfileLayout from "../styles/createProfileLayout";
import DatePickerIcon from "../../assets/images/date-picker-icon.png";
import WalletLoading from "../components/WalletLoading";
import EditImage from "../recycles/EditImage";

const CreateDog = ({ navigation }: any) => {
	const [imageUri, setImageUri] = useState<any>(null);
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const [walletAddress, setWalletAddress] = useState<string>();
	const [walletPrivateKey, setWalletPrivateKey] = useState<string>();
	const [petName, setPetName] = useState<string | "">();
	const [petSpecies, setPetSpecies] = useState<string | null>();
	const [petGender, setPetGender] = useState<string | null>("M");
	const [petBirth, setPetBirth] = useState<string | null>(
		new Date().getFullYear() +
			"-" +
			("0" + Number(1 + Number(new Date().getMonth()))).slice(-2) +
			"-" +
			("0" + new Date().getDate()).slice(-2),
	);
	const [speciesList, setSpeciesList] = useState<any[]>([]);
	const [hashId, setHashId] = useState<any>();
	const [isLoading, setIsLoading] = useState<Boolean>(false);
	const [myWalletAddress, setMyWalletAddress] = useState<string>();
	const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
	const [dropdownVIsible, setDropdownVisible] = useState(false);

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleConfirm = (date: Date) => {
		const year = date.getFullYear().toString();
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		setPetBirth(year + "-" + month + "-" + day + "T00:00:00");
		hideDatePicker();
	};

	// s3 클라이언트 초기화
	const s3 = new S3({
		accessKeyId: AWS_ACCESS_KEY,
		secretAccessKey: AWS_SECRET_ACCESS_KEY,
		region: AWS_REGION,
	});

	// IPFS 업로드
	const uploadToIPFS = async (data: any) => {
		await axios
			.post("https://animaid.co.kr/blockchain/uploadIpfs", {
				img: data.Location,
				petName: petName,
				petSpecies: petSpecies,
				petBirth: petBirth,
				petGender: petGender,
			})
			.then(async (data) => {
				console.log("nft data:", data.data);
				const nftCid = data.data;
				const imageOrigin = "https://ipfs.io/ipfs/" + data.data;
				console.log("imageOrigin:", imageOrigin);
				const overrides = {
					gasPrice: ethers.parseUnits("9000", "gwei"), // gasPrice 설정 (예: 100 gwei)
				};
				const walletAddress = myWalletAddress;
				console.log("walletAddress", walletAddress);
				console.log("데이터의 스테이터스는?:", data.status);

				if (data.status === 200) {
					console.log(1111111111111);
					const tx = await mintDogTokenContract.mintDogProfile(
						walletAddress,
						`ipfs://${nftCid}`,
					);
					const receipt = await tx.wait();
					const receiptHash = receipt.hash;

					console.log("tx:", tx);
					console.log("receipt:", receipt);
					console.log("receiptHash:", receiptHash);
					const POLYGON_KEY = String(POLYGON_API_KEY);
					checkPolygon({ POLYGON_KEY, receiptHash, imageOrigin });
				}

				console.log("끝ㄴ!!");
			});
	};

	const checkPolygon = async ({
		POLYGON_KEY,
		receiptHash,
		imageOrigin,
	}: any) => {
		console.log(111111111);
		console.log("imageOrigin:", imageOrigin);
		console.log("receiptHash:", receiptHash);
		console.log("POLYGON_KEY:", POLYGON_KEY);

		try {
			await axios
				.get(
					`https://api.polygonscan.com/api?module=account&action=tokennfttx&contractaddress=${process.env.MINT_DOG_TOKEN_ADDRESS}&address=${walletAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=asc&apikey=${POLYGON_KEY}`,
				)
				.then(async (data) => {
					console.log("data:", data);
					if (data.status === 200) {
						console.log("polygon api:", data);
						console.log("petName:", petName);
						console.log("petSpecies:", petSpecies);
						console.log("petBirth:", petBirth);
						console.log("petGender:", petGender);
						console.log("receiptHash:", receiptHash);
						console.log("imageOrigin:", imageOrigin);

						await axiosApi
							.post("/dog", {
								dogName: petName,
								dogBreed: petSpecies,
								dogSex: petGender,
								dogBirth: petBirth,
								dogNosePrint: "나건 여친구함",
								dogImg: String(imageOrigin),
								dogHash: String(receiptHash),
							})
							.then(async (data) => {
								console.log("디비로 보내는 데이터:", data);
								if (data.data.message === "강아지 등록 성공") {
									Alert.alert(
										"프로필 생성이 완료되었습니다.",
										"외부 디지털 지갑에서 확인하려면 최대 1일까지도 소요될 수 있습니다.",
									);
									await setIsLoading(false);
									await navigation.navigate("DogProfile");
								} else {
									await setIsLoading(false);
									alert("프로필 생성 실패, 관리자에게 문의하세요.");
								}
							});
					} else {
						alert("프로필 생성 실패, 관리자에게 문의하세요.");
						setIsLoading(false);
					}
				});
		} catch (err) {
			console.log(":DB보내는 에러는 에러 !!:", err);
		}
	};

	// imagepicker 이용
	const uploadImage = async (imageUri: string) => {
		// console.log("img", imageUri);
		const response = await fetch(imageUri);
		const blob = await response.blob();
		const random = await Math.floor(Math.random() * 100000000);
		const type = await blob.type;
		const filename = await `${random}_${imageUri.split("/").pop()}`;
		const params = await {
			Bucket: AWS_BUCKET,
			Key: filename,
			Body: blob,
			ContentType: type,
		};
		await s3.upload(params, (err: any, data: any) => {
			if (err) {
				console.log("Error occured while trying to upload to S3 bucket", err);
			} else {
				console.log(data);

				try {
					uploadToIPFS(data);
				} catch (err) {
					console.log(err);
				}
			}
		});
	};

	const [selectedImg, setSelectedImg] = useState<any>(null);

	// 여기서 발급하기를 누르면 나오는 함수
	const submitRegister = async () => {
		if (!selectedImg) {
			Alert.alert("이미지를 업로드 해야 합니다");
			return;
		}
		if (!petName) {
			Alert.alert("반려견의 이름을 입력해주세요.");
			return;
		}
		if (!petSpecies) {
			Alert.alert("반려견의 종을 입력해주세요.");
			return;
		}
		if (!petGender) {
			Alert.alert("반려견의 성별을 입력해주세요.");
			return;
		}
		uploadImage(selectedImg);
	};

	const uploadIpfs = async () => {
		try {
			await setIsLoading(true);

			await uploadImage(imageUri);
		} catch (err) {
			await setIsLoading(false);
			alert("민팅 생성 에러, 관리자에게 문의하세요.");
		}
	};

	useEffect(() => {
		const getWalletInfoFromStore = async () => {
			const walletAddress = await EncryptedStorage.getItem("walletAddress");
			if (walletAddress) {
				setWalletAddress(walletAddress);
			}
			const privateKey = await EncryptedStorage.getItem("privateKey");
			if (privateKey) {
				setWalletPrivateKey(privateKey);
			}
		};

		const getPetSpecies = async () => {
			axiosApi.get("/dog/breed").then((data) => {
				if (data.data.message === "견종 전체 목록 조회 완료") {
					setSpeciesList(() => {
						return data.data.data;
					});
				}
			});
		};

		const getWalletAddress = async () => {
			const myWalletAddress = await EncryptedStorage.getItem("walletAddress");
			setMyWalletAddress(String(myWalletAddress));
		};

		getPetSpecies();
		getWalletAddress();
	}, []);

	const filteredSpeciesList = speciesList.filter((species) => {
		if (!species.breedName || !searchTerm) return false;
		return species.breedName.toLowerCase().includes(searchTerm.toLowerCase());
	});

	return (
		<>
			<CommonLayout>
				<ColorHeader title="프로필 작성" />
				<CustomText
					mainText="나의 반려견"
					emphasizedText="NFT"
					emphasizedColor="#3D6CC9"
					finalText="을 만들어보세요"
				/>
				<EditImage
					selectedImg={selectedImg}
					setSelectedImg={setSelectedImg}
				></EditImage>

				<View>
					{imageUri && (
						<Image
							source={{ uri: imageUri }}
							style={CreateProfileLayout.selectedImage}
						/>
					)}
				</View>
				<View style={CreateProfileLayout.formWrap}>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 이름을 입력해주세요.
					</Text>
					<TextInput
						style={CreateProfileLayout.formInput}
						onChangeText={(text) => setPetName(text)}
						value={petName}
					/>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 종을 입력해주세요.
					</Text>

					<>
						<TextInput
							style={CreateProfileLayout.formInput}
							value={petSpecies || ""}
							onChangeText={(text) => {
								setPetSpecies(text);
								setSearchTerm(text); // 검색어 업데이트
								setDropdownVisible(true);
							}}
							placeholder="종을 검색해 아래를 클릭하세요"
							onBlur={() => setDropdownVisible(false)}
						/>
						{dropdownVIsible ? (
							<Picker
								selectedValue={petSpecies} // 여기는 petSpecies를 사용합니다.
								onValueChange={(itemValue, itemIndex) => {
									setPetSpecies(itemValue);
									setSearchTerm(`${itemValue}`);
								}}
								style={CreateProfileLayout.formInput}
							>
								<Picker.Item
									key={-1}
									label={`"${petSpecies}"검색결과를 클릭하세요`}
									value={""}
									style={{ color: "#EE8A72", fontWeight: "bold", fontSize: 16 }}
								/>
								{filteredSpeciesList.map((species, index) => {
									return (
										<Picker.Item
											key={index}
											label={species.breedName}
											value={species.breedName}
											style={{ color: "#000000" }}
										/>
									);
								})}
							</Picker>
						) : null}
					</>

					<Text style={CreateProfileLayout.formTitle}>
						반려견의 성별을 입력해주세요.
					</Text>
					<Picker
						selectedValue={petGender}
						onValueChange={(itemValue, itemIndex) => setPetGender(itemValue)}
						style={CreateProfileLayout.formInput}
					>
						<Picker.Item label="M" value="M" />
						<Picker.Item label="F" value="F" />
					</Picker>
					<Text style={CreateProfileLayout.formTitle}>
						반려견의 생일을 입력해주세요.
					</Text>
					<TouchableOpacity activeOpacity={0.7} onPress={showDatePicker}>
						<View style={CreateProfileLayout.dateFormWrap}>
							<Image source={DatePickerIcon} />
							<Text style={CreateProfileLayout.dateFormText}>{petBirth}</Text>
						</View>
					</TouchableOpacity>
					<DateTimePickerModal
						isVisible={isDatePickerVisible}
						mode="date"
						onConfirm={handleConfirm}
						onCancel={hideDatePicker}
					/>
				</View>
				{dropdownVIsible ? (
					<>
						<View style={{ marginTop: 33 }}></View>
						<View style={CreateProfileLayout.formButtonWrap}>
							{isLoading ? (
								<TouchableOpacity activeOpacity={0.7}>
									<View style={CreateProfileLayout.submitInactiveButton}>
										<Text style={CreateProfileLayout.submitInactiveButtonText}>
											프로필 생성하기
										</Text>
									</View>
								</TouchableOpacity>
							) : (
								<TouchableOpacity
									activeOpacity={0.7}
									onPress={() => {
										uploadIpfs();
									}}
								>
									<View style={CreateProfileLayout.submitButton}>
										<Text style={CreateProfileLayout.submitButtonText}>
											프로필 생성하기
										</Text>
									</View>
								</TouchableOpacity>
							)}

							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => navigation.navigate("Profile")}
							>
								<View style={CreateProfileLayout.cancelButton}>
									<Text style={CreateProfileLayout.cancelButtonText}>
										취소하기
									</Text>
								</View>
							</TouchableOpacity>
						</View>
					</>
				) : (
					<View style={CreateProfileLayout.formButtonWrap}>
						{isLoading ? (
							<TouchableOpacity activeOpacity={0.7}>
								<View style={CreateProfileLayout.submitInactiveButton}>
									<Text style={CreateProfileLayout.submitInactiveButtonText}>
										프로필 생성하기
									</Text>
								</View>
							</TouchableOpacity>
						) : (
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() => {
									// uploadIpfs();
									submitRegister();
								}}
							>
								<View style={CreateProfileLayout.submitButton}>
									<Text style={CreateProfileLayout.submitButtonText}>
										프로필 생성하기
									</Text>
								</View>
							</TouchableOpacity>
						)}

						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => navigation.navigate("Profile")}
						>
							<View style={CreateProfileLayout.cancelButton}>
								<Text style={CreateProfileLayout.cancelButtonText}>
									취소하기
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}

				{/* <Footer /> */}
			</CommonLayout>
			{isLoading ? (
				<WalletLoading title="프로필을 생성하는데 10초 이상 소요될 수 있습니다." />
			) : (
				<></>
			)}
		</>
	);
};

export default CreateDog;

const styles = StyleSheet.create({
	viewcontainer: {
		justifyContent: "center",
		alignItems: "center",
		// marginVertical: responsiveHeight(12),
	},
	imageupdate: {
		width: responsiveWidth(100),
	},
	imgcontainer: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: responsiveHeight(5),
	},
	imageUploadWrap: {
		width: responsiveWidth(85),
		height: 110,
		borderWidth: 2,
		borderColor: "#E1E1E1",
		borderRadius: 10,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 24,
	},
	formInput: {
		width: responsiveWidth(85),
		height: 36,
		borderWidth: 1,
		borderColor: "#9D9D9D",
		borderRadius: 2,
		marginTop: 7,
		padding: 6,
	},
	textAlign: {
		marginTop: responsiveHeight(2),
		textAlign: "left",
		width: responsiveWidth(85),
	},
});
