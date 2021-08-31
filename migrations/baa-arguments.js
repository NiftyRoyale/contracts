require('dotenv').config();
/**
 * ChainLink parameters
 * @type {[type]}
 */
 const {
   VRF_COORDINATOR,
   LINKTOKEN,
   KEYHASH,
   FEE,
   MAX_GAS
 } = process.env;

module.exports = [
  VRF_COORDINATOR,
  LINKTOKEN,
  KEYHASH,
  `${FEE * 10**18}`,
  `${MAX_GAS * 10**9}`
];
