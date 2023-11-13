declare module "*.svg" {
	const content: any;
	export default content;
}

declare module "*.jpg" {
	const content: any;
	export default content;
}

declare module "*.png" {
	const content: any;
	export default content;
}

declare module "@env" {
	export const WEB_CLIENT_ID: string;
	export const AWS_ACCESS_KEY: string;
	export const AWS_SECRET_ACCESS_KEY: string;
	export const AWS_REGION: string;
	export const AWS_BUCKET: string;
	export const RPC_URL: string;
	export const MINT_DOG_TOKEN_ADDRESS: string;
	export const ADMIN_WALLET_PRIVATE_KEY: string;
	export const POLYGON_API_KEY: string;
	export const GEOCODING_API_KEY: string;
	export const OBJECT_DETECT_API_KEY: string;
	export const OBJECT_DETECT_URL: string;
}

// sockjs-client.d.ts
declare module "sockjs-client" {
	var SockJS: any;
	export default SockJS;
}

// text-endoing.d.ts
declare module "text-encoding" {
	export var TextEncoder: any;
	export var TextDecoder: any;
	export const GEOCODING_API_KEY: string;
}
