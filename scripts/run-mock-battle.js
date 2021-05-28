require('dotenv').config();
const { BattleRoyaleArena } = require('./contracts');
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

async function main() {
  try {
    let b = new BattleRoyaleArena({
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
    console.log(`Running test`);
    await b.testElimination();

    return console.log('elimination executed');
  } catch (e) {
    return console.error(e);
  }
}

main();
