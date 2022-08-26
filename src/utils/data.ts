export const DEV_MODE = true;

export const CHAIN_ID = DEV_MODE ? 4 : 137;
export const MAINNET_ID = 137;
export const TESTNET_ID = 4;

export const RPC_URL = {
    137: "https://polygon-mainnet.g.alchemy.com/v2/yVcv2MTQpFLvVclugH6QPGKPBsFAZrDg",
    // 80001: "https://speedy-nodes-nyc.moralis.io/f20199705d9b3bb894f74574/polygon/mumbai",
    // 80001: "https://speedy-nodes-nyc.moralis.io/20cea78632b2835b730fdcf4/polygon/mumbai", // code
    4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
}

export const SIGN_PASSWORD = "YOURMEY_PASSWORD"

export const API_SERVER_URL = DEV_MODE ? "http://localhost:5000/api/" : "https://yemnation.com/api/";

export const BASE_URL = DEV_MODE ? "https://localhost:3000" : "https://yemnation.com";