require('dotenv').config();
const {
  BattleRoyale,
  BattleRoyaleArena
} = require('./contracts');
const {
  NFT_ADDRESS,
  SCAN_API_KEY,
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

const main = async () => {
  try {
    const b = new BattleRoyale({
      address: NFT_ADDRESS,
      mnemonic: MNEMONIC,
      scanKey: SCAN_API_KEY,
      owner: OWNER_ADDRESS,
      network: NETWORK,
      node: isInfura
        ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    });
    await b.init();

    const intervalTime = await b.intervalTime(); // Get time interval in minutes
    const timestamp = await b.timestamp(); // UNIX epoch timestamp of last elimination
    const nextElimination = Number(timestamp) + (Number(intervalTime) * 60);
    const date = new Date(nextElimination * 1000); // Convert timestamp to date by multiplying by 1000 and converting to date

    console.log(`Next elimination time at ${timeConverter(date)}`);
  } catch (e) {
    return console.error(e);
  }
}

main();
