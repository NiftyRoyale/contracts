require('dotenv').config();
const { ethers } = require("hardhat");
const arguments = require('./arguments');
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

const main = async () => {
  try {
    const [deployer] = await ethers.getSigners();

    console.log(
      "Deploying contracts with the account:",
      deployer.address
    );

    console.log("Account balance:", (await deployer.getBalance()).toString());

    const BattleRoyale = await ethers.getContractFactory("BattleRoyale");
    const BattleRoyaleArena = await ethers.getContractFactory("BattleRoyaleArena");

    // const arena = await BattleRoyaleArena.deploy(
    //   VRF_COORDINATOR,
    //   LINKTOKEN,
    //   KEYHASH
    // );
    // await arena.deployed();

    const battleRoyale = await BattleRoyale.deploy(
      ...arguments
    );

    await battleRoyale.deployed();

    console.log(`NFT deployed to ${battleRoyale.address}`);

    return console.log('SUCCESS: Deployment completed');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

main();