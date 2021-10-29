require('dotenv').config();
/**
* ChainLink parameters
* @type {[type]}
*/

let arguments;

// if testnets then use the suffix based envs
if (["kovan", "rinkeby"].includes(process.env.HARDHAT_NETWORK)) {
  const network = process.env.HARDHAT_NETWORK.toUpperCase();
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
