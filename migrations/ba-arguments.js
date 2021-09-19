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
const price = 0.0001 * 10**18;

module.exports = [
  `Nifty Royale X Eoin Three Doorways`,
  `NRETD`,
  `${price}`,
  8,
  8,
  false,
  false,
  ARENA_CONTRACT_ADDRESS
];
