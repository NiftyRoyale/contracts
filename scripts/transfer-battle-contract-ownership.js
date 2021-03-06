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

const newOwner = '0xEc0D8feACF105C364d5B7c2c7222eC708D35d95e';

async function main() {
  try {
    let b = new BattleRoyale({
      address: NFT_ADDRESS,
      mnemonic: MNEMONIC,
      etherscanKey: ETHERSCAN_API_KEY,
      owner: OWNER_ADDRESS,
      network: NETWORK,
      node: isInfura
        ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    });
    await b.init();

    console.log(`Beginning ownership transfer of ${NFT_ADDRESS} to ${newOwner}`);
    await b.transferOwnership(newOwner);

    return console.log('Transfer complete');
  } catch (e) {
    return console.error(e);
  }
}

main();
