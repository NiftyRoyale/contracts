require('dotenv').config();
const { ethers } = require("hardhat");
const BRArguments = require('./ba-arguments');
const BRAArguments = require('./baa-arguments');
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

    // const BattleRoyaleFactory = await ethers.getContractFactory("BattleRoyaleFactory");
    // const brf = await BattleRoyaleFactory.deploy();
    // console.log(`BattleRoyaleFactory deployed to ${brf.address}`);

    // const BattleRoyaleArena = await ethers.getContractFactory("BattleRoyaleArena");
    // const arena = await BattleRoyaleArena.deploy(
    //   ...BRAArguments
    // );
    //
    // await arena.deployed();
    // console.log(`Arena deployed to ${arena.address}`);

    const BattleRoyale = await ethers.getContractFactory("BattleRoyale");
    const battleRoyale = await BattleRoyale.deploy(
      ...BRArguments
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
