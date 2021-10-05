require('dotenv').config();
/**
 * ChainLink parameters
 * @type {[type]}
 */
const { ARENA_CONTRACT_ADDRESS } = process.env;

/**
 * BattleRoyale
 * string memory _name
 * string memory _symbol
 * uint256 _price
 * uint256 _units
 * uint256 _supply
 * bool _autoStart
 * bool _autoPayout
 * address payable _arenaContract
 */
const price = 0.15 * 10**18;

module.exports = [
  `Nifty Royale X EJ Hassenfratz: King Kani's Tiny Kingdom`,
  `NREJHKKTK`,
  `${price}`,
  5,
  30,
  false,
  false,
  ARENA_CONTRACT_ADDRESS
];
