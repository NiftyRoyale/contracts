require('dotenv').config();
const { ChainlinkRegistry } = require('./contracts');
const {
  SCAN_API_KEY,
  NETWORK,
  INFURA_KEY,
  ALCHEMY_KEY,
  MNEMONIC,
  OWNER_ADDRESS
} = process.env;
const NODE_API_KEY = INFURA_KEY || ALCHEMY_KEY;
const isInfura = !!INFURA_KEY;

async function main() {
  try {
    const c = new ChainlinkRegistry({
      address: '0xAaaD7966EBE0663b8C9C6f683FB9c3e66E03467F',
      mnemonic: MNEMONIC,
      scanKey: SCAN_API_KEY,
      owner: OWNER_ADDRESS,
      network: NETWORK,
      node: isInfura
        ? "https://" + NETWORK + ".infura.io/v3/" + NODE_API_KEY
        : "https://eth-" + NETWORK + ".alchemyapi.io/v2/" + NODE_API_KEY,
    });
    await c.init();

    await c.addFunds(27, 10);
    const res = await c.getUpkeep(27);
    console.log(res);
    return;
  } catch (e) {
    console.error(e);
    return;
  }
}

main();
