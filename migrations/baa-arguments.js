require('dotenv').config();
/**
 * ChainLink parameters
 * @type {[type]}
 */
 const {
   VRF_COORDINATOR,
   LINKTOKEN,
   KEYHASH,
   FEE
 } = process.env;

module.exports = [
  VRF_COORDINATOR,
  LINKTOKEN,
  KEYHASH,
  `${FEE * 10**18}`
];
