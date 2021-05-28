require('dotenv').config();
const BattleRoyale = artifacts.require("BattleRoyale.sol");
const BattleRoyaleArena = artifacts.require("BattleRoyaleArena.sol");
const BattleRoyaleFactory = artifacts.require("BattleRoyaleFactory.sol");

/**
 * ChainLink parameters
 * @type {[type]}
 */
const {
  VRF_COORDINATOR,
  LINKTOKEN,
  KEYHASH,
  OWNER_ADDRESS,
  ARENA_CONTRACT_ADDRESS
} = process.env;

module.exports = async (deployer, network, addresses) => {
  try {
    // await deployer.deploy(BattleRoyaleFactory, {gas: 10000000});

    await deployer.deploy(BattleRoyaleArena,
      VRF_COORDINATOR,
      LINKTOKEN,
      KEYHASH,
      {gas: 10000000}
    );
    const arena = await BattleRoyaleArena.deployed();
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
     * address payable _owner
     */
    await deployer.deploy(BattleRoyale,
      'Nifty Royale Internal Main Account Drop',
      'NRIMAD',
      2,
      1,
      4,
      true,
      false,
      arena.address,
      {gas: 10000000}
    );

    return console.log('SUCCESS: Deployment completed');
  } catch (e) {
    return console.log('FAILED: Deployment Error');
  }
};
