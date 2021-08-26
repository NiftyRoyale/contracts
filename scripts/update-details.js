require('dotenv').config();
const { BattleRoyale } = require('./contracts');
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
  const address = '0x4D4165C54726c25f7C39F56fefCb1367374fBB87';

  try {
    let b = new BattleRoyale({
      address: address,
      mnemonic: MNEMONIC,
      etherscanKey: ETHERSCAN_API_KEY,
      owner: OWNER_ADDRESS,
      network: NETWORK,
      node: isInfura
        ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    });
    await b.init();

    console.log(`Updating ${address}`);

    // await b.setIntervalTime(10);
    // await b.setMaxSupply(50);

    await b.setPrice(0.1);

    return console.log('Update complete');
  } catch (e) {
    return console.error(e);
  }
}

main();
