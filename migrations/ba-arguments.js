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
 * uint256 _maxElimsPerCall
 * bool _autoStart
 * bool _autoPayout
 * address payable _arenaContract
 */

const price = 0.01 * 10**18;

module.exports = [
  'Nifty Royale Test Batch Elim 2',
  'NRTBE2',
  `${price}`,
  5,
  15,
  5,
  true,
  false,
  ARENA_CONTRACT_ADDRESS
];
