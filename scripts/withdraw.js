require('dotenv').config();
const {
  BattleRoyale,
  BattleRoyaleArena
} = require('./contracts');
const {
  NFT_ADDRESS,
  ETHERSCAN_API_KEY,
  NETWORK,
  INFURA_KEY,
  ALCHEMY_KEY,
  MNEMONIC,
  OWNER_ADDRESS,
  BASIC_NFT_META_DATA,
  UPGRADE_NFT_META_DATA,
  ARENA_CONTRACT_ADDRESS
} = process.env;
const NODE_API_KEY = INFURA_KEY || ALCHEMY_KEY;
const isInfura = !!INFURA_KEY;

async function main() {
  try {
    // const b = new BattleRoyale({
    //   address: NFT_ADDRESS,
    //   mnemonic: MNEMONIC,
    //   etherscanKey: ETHERSCAN_API_KEY,
    //   owner: OWNER_ADDRESS,
    //   network: NETWORK,
    //   node: isInfura
    //     ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
    //     : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    // });
    // await b.init();
    //
    // let currentBalance = await b.getCurrentBalance();
    // console.log(`current balance before withdrawl: ${currentBalance}`);
    //
    // console.log('Withdrawing ETH...');
    // await b.withdraw();
    //
    // currentBalance = await b.getCurrentBalance();
    // return console.log(`balance after withdrawl: ${currentBalance}`);
    const b = new BattleRoyaleArena({
      address: ARENA_CONTRACT_ADDRESS,
      mnemonic: MNEMONIC,
      etherscanKey: ETHERSCAN_API_KEY,
      owner: OWNER_ADDRESS,
      network: NETWORK,
      node: isInfura
        ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    });
    await b.init();

    // let nftBalance = await b.getCurrentBalanceInNFTContract(NFT_ADDRESS);
    // console.log(`current NFT balance before withdrawl: ${nftBalance}`);
    // await b.withdrawBalanceInNFTContract(NFT_ADDRESS, nftBalance);
    // console.log('Withdrawing NFT Balance...');

    let currentLink = await b.getCurrentLinkBalance();
    console.log(`current LINK balance before withdrawl: ${currentLink}`);

    console.log('Withdrawing LINK...');
    await b.withdrawLink(currentLink);

    let currentBalance = await b.getCurrentBalance();
    console.log(`current balance before withdrawl: ${currentBalance}`);

    console.log('Withdrawing ETH...');
    await b.withdraw(currentBalance);

    currentBalance = await b.getCurrentBalance();
    return console.log(`balance after withdrawl: ${currentBalance}`);
  } catch (e) {
    return console.error(e);
  }
}

main();
