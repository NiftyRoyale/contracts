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
  try {
    console.log('Initializing BattleRoyale...');
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

    const currentBalance = await b.getCurrentBalance();
    console.log(`currentBalance: ${currentBalance}`);

    console.log('executing elimination');
    await b.executeRandomElimination("101797610511524596856150818651105350048828884514948080302267052940672636089989");
    console.log('elimination complete');
  } catch (e) {
    return console.error(e);
  }
}

main();
