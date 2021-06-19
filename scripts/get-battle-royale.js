require('dotenv').config();
const {
  BattleRoyaleArena,
  BattleRoyale
} = require('./contracts');
const {
  NFT_ADDRESS,
  ARENA_CONTRACT_ADDRESS,
  ETHERSCAN_API_KEY,
  NETWORK,
  INFURA_KEY,
  ALCHEMY_KEY,
  MNEMONIC,
  OWNER_ADDRESS,
  BASIC_NFT_META_DATA,
  UPGRADE_NFT_META_DATA
} = process.env;
const NODE_API_KEY = INFURA_KEY || ALCHEMY_KEY;
const isInfura = !!INFURA_KEY;

const timeConverter = (a) => {
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

  return time;
}

async function printNFTData(b) {
  try {
    const nft = {};
    console.log('Initializing BattleRoyale...');
    await b.init();
    nft.address = b.address;
    nft.name = await b.name();
    nft.symbol = await b.symbol();
    nft.maxSupply = await b.maxSupply();
    nft.totalSupply = await b.totalSupply();
    nft.unitsPerTransaction = await b.unitsPerTransaction();
    nft.prizeTokenURI = await b.prizeTokenURI();
    nft.artist = await b.artist();
    nft.feeRate = await b.feeRate();
    nft.defaultTokenURI = await b.defaultTokenURI();
    const timestamp = nft.timestamp = await b.timestamp();
    const intervalTime = nft.intervalTime = await b.intervalTime();
    nft.inPlay = await b.getInPlay();
    nft.outOfPlay = await b.getOutOfPlay();
    nft.price = await b.price();
    nft.battleState = await b.battleState();
    nft.ethBalance = await b.getCurrentBalance();

    const nextElimination = Number(timestamp) + (Number(intervalTime) * 60);
    const date = new Date(nextElimination * 1000); // Convert timestamp to date by multiplying by 1000 and converting to date
    nft.nextElimination = timeConverter(date);

    console.log(nft);
  } catch (e) {
    console.error(e);
  }
}

async function main() {
  try {
    // const a = new BattleRoyaleArena({
    //   address: ARENA_CONTRACT_ADDRESS,
    //   mnemonic: MNEMONIC,
    //   etherscanKey: ETHERSCAN_API_KEY,
    //   owner: OWNER_ADDRESS,
    //   network: NETWORK,
    //   node: isInfura
    //     ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
    //     : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    // });
    // await a.init();
    //
    // const currentLinkBalance = await a.getCurrentLinkBalance();
    // console.log(`currentLinkBalance: ${currentLinkBalance}`);
    //
    // const currentBalance = await a.getCurrentBalance();
    // console.log(`currentBalance: ${currentBalance}`);
    //
    // const battleQueue = await a.getBattleQueue();
    // console.log(`battleQueue: ${battleQueue}`);

    const nfts = ['0xAa79A77BaBbDa34d20a013925Cdb8DE0791E1c94'].map((a) => {
      return new BattleRoyale({
        address: a,
        mnemonic: MNEMONIC,
        etherscanKey: ETHERSCAN_API_KEY,
        owner: OWNER_ADDRESS,
        network: NETWORK,
        node: isInfura
          ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
          : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
      })
    });

    nfts.forEach((b) => printNFTData(b));
  } catch (e) {
    return console.error(e);
  }
}

main();
