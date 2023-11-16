import React, { useState, useEffect } from "react";
import { Button, Text, View } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import { GEOCODING_API_KEY } from "@env";
import { Dispatch, SetStateAction } from "react";

type Props = {
	setAddress: (address: string) => void;
	setMissinglat: Dispatch<SetStateAction<number>>;
	setMissinglong: Dispatch<SetStateAction<number>>;
};

const GeoLocationAPI = (props: Props) => {
	useEffect(() => {
		getGeoLocation();
	}, []);

	const getGeoLocation = () => {
		Geolocation.getCurrentPosition(
			(position) => {
				const latitude = JSON.stringify(position.coords.latitude);
				const longitude = JSON.stringify(position.coords.longitude);
				getAddressCode(Number(latitude), Number(longitude));
				props.setMissinglat(Number(latitude).toFixed(3));
				props.setMissinglong(Number(longitude).toFixed(3));
				console.log(
					Number(latitude).toFixed(3),
					"++++++",
					Number(longitude).toFixed(3),
				);
				console.log("플보스!ㅁ나ㅜ임이ㅓ", props);
			},
			(error) => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	};

	const getAddressCode = async (latitude: number, longitude: number) => {
		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${GEOCODING_API_KEY}`,
			);
			const formattedAddress = response.data.results[0].formatted_address;
			const addressParts = formattedAddress.split(" ");
			const address = addressParts.reduce((acc, part) => {
				return part ? `${acc} ${part}`.trim() : acc;
			}, "");
			props.setAddress(address);
			console.log("address : ", address);
		} catch (error) {
			console.error("An error occurred while fetching the dong code:", error);
		}
	};

	return <></>;
};

export default GeoLocationAPI;
