# Nifty Royale Ethereum contract

<br/>
<p align="center">
<a href="https://niftyroyale.com/" target="_blank">
<img src="https://s3.amazonaws.com/awe-portfolio-assets/page_60e9adaaeb69f90008869ad0_Nifty-Royale-Base-NFT.png" width="225" alt="Nifty Royale logo">
</a>
</p>
<br/>

## Description
Nifty Royale is a blockchain based lottery elimination game, where a set number of NFT art tokens are minted to be auctioned off. Once all have been auctioned off, the game can then begin where a single token is eliminated at random from being in play over a period of time. This elimination repeats over and over again until there is only 1 token left in play and the battle is concluded. Once the game is over, the remaining token will then be rewarded with an upgrade and that token has now become a unique one of it's kind.

## Architecture / Components
Nifty Royale is comprised of 2 contracts deployed on the blockchain and leverages chainlink node features in order to execute the game mechanics. OpenSea is used to request data of the NFTs within an angular web app along with WebJS to interact directly with the BattleRoyale contract. OpenSea or any other 3rd party NFT auction site could be used to run initial sale of the NFTs. IPFS is the off chain data source to store and request the token metadata.

![nifty-royale-architecture](https://s3.amazonaws.com/awe-portfolio-assets/page_60e9adaaeb69f90008869ad0_Full-NiftyRoyale-architecture.jpeg)

- Royale NFT contract: used for minting the NFT tokens
- BattleRoyale contract: used for calling the Royale contract, keeping track of the state of the game and executing the game mechanics
- Chainlink Keeper Network: used to execute the elimination function over a period of time
- Chainlink VRF (Verifiable Random Function): Used to generate a random index for eliminating a token in play
- Web3.JS: used in the web app(https://github.com/samteb/nifty-royale-frontend) hosted at (https://nifty-bot-marketplace.web.app/) for making ABI calls to the BattleRoyale contract
- OpenSea: for auctioning and sale of the NFT tokens
- IPFS: Used for storing NFT token meta-data off chain in decentralized source

## Requirements

- NPM

## Installation

1. Install truffle

```bash
npm install truffle -g
```

2. Set your environment variables
```bash
open .env.example
```
fill in the missing following fields:
```bash
ALCHEMY_KEY="< your alchemy API key for the appropriate network >"
MNEMONIC="< mnemonic of the wallet that will be used to mint and execute methods that will use gas >"
ETHERSCAN_API_KEY="< Etherscan API key for contract deployment vaidation can be found here https://etherscan.io/apis >"
OWNER_ADDRESS="< account address of the wallet that will be used to mint and execute methods that use gas >"
NETWORK="< name of network that will be deployed to. Example 'rinkeby', 'kovan' or 'mainnet' >"
```
rename '.env.example' file to '.env'
3. Install dependencies by running:

```bash
cd nft-royales/
npm install

# OR...

yarn install
```

## Test

```bash
npm test
```

## Deploy

For deploying to the network, Truffle will use `truffle-hdwallet-provider` for your mnemonic and an RPC URL. Ensure step 2 in Installation has been done correctly before running the following steps:

1. Deploy contracts
```bash
truffle deploy --network `< network name >`
```
2. Validate successful deployment
```bash
truffle run verify BattleRoyale --network `< network name>` --license MIT
```
3. Set contract reference variables
```bash
open .env
```
fill in the missing following fields with information outputted from truffle deploy:
```bash
FACTORY_CONTRACT_ADDRESS="< contract address of BattleRoyale >"
NFT_CONTRACT="< contract address of Royale >"
```

## NFT creation
Ensure that step 1 and 2 are done correctly before running the following steps:

1. Create meta-data urls for basic and premium NFTs
Create 2 meta-data urls. 1 for all NFTs and 1 for the winning NFT to be upgraded to.
format should adhere to the meta-data standard referred to in this link: https://docs.opensea.io/docs/metadata-standards#section-metadata-structure

2. apply configs
```bash
open .env
```
fill in or update the following fields with appropriate information:
```bash
NUM_NFT="< number of NFTs to mint >"
BASIC_NFT_META_DATA="< the basic meta-data url of NFTs to mint >"
UPGRADE_NFT_META_DATA="< the upgrade meta-data url of the winning NFTs >"

```
3. Mint NFTS
run the following command
```bash
node scripts/mint.js
```
4. Set update meta-data url on contract
run the following command
```bash
node scripts/set-prize-token-uri.js
```
## Fund the Battle Royale Contract with LINK
In order to utilize chainlink to run the game mechanics, LINK must be supplied to the BattleRoyale contract. Send LINK to the deployed BattleRoyale contract adderes that has been deployed. This can be done through meta mask or another blockchain wallet.

## Helper Scripts

- Starts the game by setting the battle_state to running and the clock begins using keeper
```bash
node scripts/begin-battle.js
```
- Get the current game state
```bash
node scripts/current-game-board.js
```
- Force a random elimination now. NOTE: stats will be reflected when the next block is mined. wait a few minutes and then execute current-game-board to validate
```bash
node scripts/execute-randomness.js
```
- Retrieve list of all tokens in state
```bash
node scripts/get-all.js
```
