import { atom } from "recoil";

export const isLoggedInState = atom({
	key: "isLoggedInState",
	default: false,
});

export const accessTokenState = atom({
	key: "accessTokenState",
	default: "",
});

export const walletAddress = atom({
	key: "walletAddress",
	default: [],
});

export const isLogged = atom({
	key: "isLogged",
	default: false,
});
