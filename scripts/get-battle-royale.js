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
    const n = {};
    console.log('Initializing BattleRoyale...');
    await b.init();
    const intervalTime = await b.intervalTime();
    n.address = b.address;
    n.name = await b.name();
    n.currentBalance = await b.getCurrentBalance();
    n.symbol = await b.symbol();
    n.inPlay = await b.getInPlay();
    n.outOfPlay = await b.getOutOfPlay();
    n.battleState = await b.getBattleState();
    const timestamp = n.timestamp = await b.timestamp();
    const nextElimination = Number(timestamp) + (Number(intervalTime) * 60);
    n.nextElimination =  new Date(nextElimination * 1000);
    n.totalSupply = await b.totalSupply();
    n.maxSupply = await b.maxSupply();
    n.defaultTokenURI = await b.defaultTokenURI();
    n.prizeTokenURI = await b.prizeTokenURI();
    n.price = await b.price();
    n.unitsPerTransaction = await b.unitsPerTransaction();
    // n.maxElimsPerCall = await b.maxElimsPerCall();
    n.intervalTime = intervalTime;

    const date = new Date(nextElimination * 1000); // Convert timestamp to date by multiplying by 1000 and converting to date
    n.nextElimination = timeConverter(date);

    console.log(n);
  } catch (e) {
    console.error(e);
  }
}

async function main() {
  try {
    const a = new BattleRoyaleArena({
      address: ARENA_CONTRACT_ADDRESS,
      mnemonic: MNEMONIC,
      etherscanKey: ETHERSCAN_API_KEY,
      owner: OWNER_ADDRESS,
      network: NETWORK,
      node: isInfura
        ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    });
    await a.init();

    const currentLinkBalance = await a.getCurrentLinkBalance();
    console.log(`currentLinkBalance: ${currentLinkBalance}`);

    const currentBalance = await a.getCurrentBalance();
    console.log(`currentBalance: ${currentBalance}`);

    const battleQueue = await a.getBattleQueue();
    console.log(`battleQueue: ${battleQueue}`);

    const nfts = battleQueue.map((a) => {
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
