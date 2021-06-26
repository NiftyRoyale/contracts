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

const price = 0.5 * 10**18;

module.exports = [
  'Nifty Royale Testing Burn',
  'NRT',
  `${price}`,
  2,
  2,
  true,
  false,
  ARENA_CONTRACT_ADDRESS
];
