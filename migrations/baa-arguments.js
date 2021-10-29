require('dotenv').config();
/**
* ChainLink parameters
* @type {[type]}
*/

let arguments;

const {
  NETWORK,
  HARDHAT_NETWORK,
} = process.env;

const hardhatNetwork = HARDHAT_NETWORK || NETWORK;

// if testnets then use the suffix based envs
if (["kovan", "rinkeby"].includes(hardhatNetwork)) {
  const network = hardhatNetwork.toUpperCase();
  arguments = [
    process.env[`VRF_COORDINATOR_${network}`],
    process.env[`LINKTOKEN_${network}`],
    process.env[`KEYHASH_${network}`],
    `${process.env[`FEE_${network}`] * 10**18}`
  ];
} 
// go for mainnet
else {
  const {
    VRF_COORDINATOR,
    LINKTOKEN,
    KEYHASH,
    FEE
  } = process.env;
  arguments = [
    VRF_COORDINATOR,
    LINKTOKEN,
    KEYHASH,
    FEE
  ];
}

module.exports = arguments;
