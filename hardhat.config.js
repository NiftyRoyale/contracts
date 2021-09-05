require('dotenv').config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
const {
  MNEMONIC,
  INFURA_KEY,
  ALCHEMY_KEY,
  PRIVATE_KEY,
  SCAN_API_KEY
} = process.env;
const NODE_API_KEY = INFURA_KEY || ALCHEMY_KEY;
const isInfura = !!INFURA_KEY;

const needsNodeAPI =
  process.env.npm_config_argv &&
  (process.env.npm_config_argv.includes("rinkeby") ||
    process.env.npm_config_argv.includes("kovan") ||
    process.env.npm_config_argv.includes("mainnet"));

if ((!PRIVATE_KEY || !NODE_API_KEY) && needsNodeAPI) {
  console.error("Please set a private key and ALCHEMY_KEY or INFURA_KEY.");
  process.exit(0);
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: '0.6.12',
  networks: {
    kovan: {
      url: isInfura
        ? "https://kovan.infura.io/v3/" + NODE_API_KEY
        : "https://eth-kovan.alchemyapi.io/v2/" + NODE_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    rinkeby: {
      url: isInfura
        ? "https://rinkeby.infura.io/v3/" + NODE_API_KEY
        : "https://eth-rinkeby.alchemyapi.io/v2/" + NODE_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    mainnet: {
      url: isInfura
        ? "https://mainnet.infura.io/v3/" + NODE_API_KEY
        : "https://eth-mainnet.alchemyapi.io/v2/" + NODE_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/" + NODE_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    matic: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/" + NODE_API_KEY,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: SCAN_API_KEY
  },
  polygonscan: {
    apiKey: SCAN_API_KEY
  }
};
