require('dotenv').config();
const { BattleRoyale } = require('./contracts');
const {
  NFT_ADDRESS,
  ARENA_CONTRACT_ADDRESS,
  SCAN_API_KEY,
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
  const address = '0x2ae6212bC77Fde793c01D4bF8CE042De02c13c18';

  try {
    let b = new BattleRoyale({
      address: address,
      mnemonic: MNEMONIC,
      scanKey: SCAN_API_KEY,
      owner: OWNER_ADDRESS,
      network: NETWORK,
      node: isInfura
        ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    });
    await b.init();

    // console.log(`Updating ${address}`);
    //
    await b.setIntervalTime(5);
    // await b.setMaxSupply(50);
    // await b.setUnitsPerTransaction(24);

    return console.log('Update complete');
  } catch (e) {
    return console.error(e);
  }
}

main();
