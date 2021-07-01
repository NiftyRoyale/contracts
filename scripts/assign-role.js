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

    console.log(`Granting access`);

    const addresses = [
      '0x42dD7716721ba279dA2f1F06F97025d739BD79a8'
    ];

    // Aaron: '0x85Df0EFEd48Bb24Cd54E339F67706b76132f651C',
    // Karen: '0x7243508B98bdB260ad825b60976dBDb2e8115771'
    // Tim: '0xb21D08FbAAb4a1BFd2e3a01d3Dc8eB62bb159a54'
    // Sam: '0xD6FdABaA5E01D9C579E0dE5e96aB62B888cd0f18'

    for (let a of addresses) {
      console.log(`granting access to: ${a}`);
      // await b.grantAdminAccess(a);
      await b.grantSupportAccess(a);
    }

    console.log('Access assignment complete');
  } catch (e) {
    return console.error(e);
  }
}

main();
