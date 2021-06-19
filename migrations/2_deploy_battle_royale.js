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

    // await deployer.deploy(BattleRoyaleArena,
    //   VRF_COORDINATOR,
    //   LINKTOKEN,
    //   KEYHASH,
    //   {gas: 10000000}
    // );
    // const arena = await BattleRoyaleArena.deployed();
    /**
     * BattleRoyale
     * string memory _name
     * string memory _symbol
     * uint256 _price
     * uint256 _supply
     * bool _gateway
     * bool _autoStart
     * bool _autoPayout
     * address payable _arenaContract
     */

    const price = 0.01 * 10**18;

    await deployer.deploy(BattleRoyale,
      'Nifty Royale Testnet Drop 2',
      'NRTD2',
      `${price}`,
      100,
      true,
      false,
      false,
      ARENA_CONTRACT_ADDRESS,
      {gas: 10000000}
    );

    return console.log('SUCCESS: Deployment completed');
  } catch (e) {
    return console.log('FAILED: Deployment Error');
  }
};
