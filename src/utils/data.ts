export const DEV_MODE = false;

export const CHAIN_ID = DEV_MODE ? 137 : 137;
export const MAINNET_ID = 137;
export const TESTNET_ID = 4;

export const RPC_URL = {
    137: "https://polygon-mainnet.g.alchemy.com/v2/yVcv2MTQpFLvVclugH6QPGKPBsFAZrDg",
    // 80001: "https://speedy-nodes-nyc.moralis.io/f20199705d9b3bb894f74574/polygon/mumbai",
    // 80001: "https://speedy-nodes-nyc.moralis.io/20cea78632b2835b730fdcf4/polygon/mumbai", // code
    4: "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
}

export const affiliateContractAddr = DEV_MODE ? "0x09Db320e8a17735c53BeAb385B83B04D8e872F22" : "0x09Db320e8a17735c53BeAb385B83B04D8e872F22";


export const SIGN_PASSWORD = "YOURMEY_PASSWORD"

export const API_SERVER_URL = DEV_MODE ? "http://localhost/api/" : "https://api.yemnation.com/api/";

export const UPLOAD_SERVER_URL = DEV_MODE ? "http://localhost/assets/" : "https://yemnation.com/assets/";

export const BASE_URL = DEV_MODE ? "https://localhost:3000/" : "https://yemnation.com/";

export const SITE_NAME = DEV_MODE ? "localhost:3000/" : "yemnation.com/";

export const LOG_HISTORY = true;

export const MAX_LIMIT = 9595;

export const TARGET_ADDRESS = "0x9124B0744EAB0c7cBae77A0B1B4FF08b00B9f25B";