const Base = require('./base');
const ABI = require('./ABI');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

class Contract extends Base {
  get address() {
    return this.get('address');
  }

  set address(a) {
    this.set('address', a, String);
  }

  get mnemonic() {
    return this.get('mnemonic');
  }

  set mnemonic(m) {
    this.set('mnemonic', m, String);
  }

  get scanKey() {
    return this.get('scanKey');
  }

  set scanKey(a) {
    this.set('scanKey', a, String);
  }

  get owner() {
    return this.get('owner');
  }

  set owner(o) {
    this.set('owner', o, String);
  }

  get network() {
    return this.get('network');
  }

  set network(n) {
    this.set('network', n, String);
  }

  get node() {
    return this.get('node');
  }

  set node(n) {
    this.set('node', n, String);
  }

  get abi() {
    return this.get('abi');
  }

  set abi(abi) {
    this.set('abi', abi, Array);
  }

  get contract() {
    return this.get('contract');
  }

  set contract(c) {
    this.set('contract', c, this.web3.eth.Contract);
  }

  async init() {
    try {
      await this._initWeb3();
      await this._getContract();

      return Promise.resolve(this.contract);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  _initWeb3() {
    return new Promise(async (resolve, reject) => {
      if (!this.web3) {
        if (!this.address
          || !this.mnemonic
          || !this.scanKey
          || !this.owner
          || !this.node) {
          return reject(new Error("Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."));
        }
        try {
          this.web3 = new Web3(new HDWalletProvider(this.mnemonic, this.node));
          return resolve(this.web3);
        } catch (e) {
          return reject(e);
        }
      }
      return resolve(this.web3);
    });
  }

  _loadABI() {
    return new Promise(async (resolve, reject) => {
      if (!this.abi) {
        try {
          const abi = await ABI(this.address, this.scanKey, this.network);

          this.abi = abi;
          return resolve(this.abi);
        } catch (e) {
          return reject(e);
        }
      }
      return resolve(this.abi);
    });
  }

  _getContract() {
    return new Promise(async (resolve, reject) => {
      if (!this.contract) {
        try {
          const abi = await this._loadABI();

          this.contract = new this.web3.eth.Contract(
            abi,
            this.address,
            { gasLimit: "10000000" }
          );

          return resolve(this.contract);
        } catch (e) {
          return reject(e);
        }
      }
      return resolve(this.contract);
    });
  }

  get methods() {
    return this.contract.methods;
  }

  burn(tokenId) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .burn(tokenId)
      .send({ from: this.owner });
  }

  mint(address) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .mint(address)
      .send({ from: this.owner });
  }

  tokenURI(tokenId) {
    return this.contract
      .methods
      .tokenURI(tokenId)
      .call();
  }

  transferFrom(from, to, id) {
    return this.contract
      .methods
      .transferFrom(from, to, id)
      .send({ from: from });
  }

  transferTo(to, id) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.transferFrom(this.owner, to, id);
  }

  transferOwnership(to) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .transferOwnership(to)
      .send({ from: this.owner });
  }

  totalSupply() {
    return this.contract
      .methods
      .totalSupply()
      .call();
  }

  getOwner(id) {
    return this.contract
      .methods
      .owner(id)
      .call();
  }

  name() {
    return this.contract
      .methods
      .name()
      .call();
  }

  symbol() {
    return this.contract
      .methods
      .symbol()
      .call();
  }

  export() {
    this._['contract'] = undefined;
    return super.export();
  }
}

module.exports = Contract;
