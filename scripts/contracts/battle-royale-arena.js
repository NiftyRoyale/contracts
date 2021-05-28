const { Contract } = require('../block3');

class BattleRoyaleArena extends Contract {
  /**
   * return current price in ETH
   * @return {number} ETH price
   */
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

  withdraw(amount) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .withdraw(amount)
      .send({ from: this.owner });
  }

  getCurrentBalance() {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .getCurrentBalance()
      .call({ from: this.owner });
  }

  withdrawLink(amount) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .withdrawLink(amount)
      .send({ from: this.owner });
  }
  /**
   * Get Current Link Balance - Can only be called by contract owner
   * @return {Number} LINK balance in contract
   */
  getCurrentLinkBalance() {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .getCurrentLinkBalance()
      .call({ from: this.owner });
  }

  getBattleQueue() {
    return this.contract
      .methods
      .getBattleQueue()
      .call();
  }

  addToBattleQueue(contract) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .addToBattleQueue(contract)
      .send({ from: this.owner });
  }

  getBattleQueueSize() {
    return this.contract
      .methods
      .getBattleQueue()
      .call();
  }

  isContractInQueue(contracts) {
    return this.contract
      .methods
      .isContractInQueue(contracts)
      .call();
  }

  removeFromQueue(contract) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .removeFromQueue(contract)
      .send({ from: this.owner });
  }

  /* ===== Battle Royale Arena Methods ===== */
  removeFromQueue(contract) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .removeFromQueue(contract)
      .send({ from: this.owner });
  }

  setPrice(contract, price) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setPrice(contract, price)
      .send({ from: this.owner });
  }

  beginBattle(contract) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .beginBattle(contract)
      .send({ from: this.owner, gas: '10000000' });
  }

  setUnitsPerTransaction(contract, units) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setUnitsPerTransaction(contract, units)
      .send({ from: this.owner });
  }

  setMaxSupply(contract, supply) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setMaxSupply(contract, supply)
      .send({ from: this.owner });
  }

  setDefaultTokenURI(contract, tokenUri) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setDefaultTokenURI(contract, tokenUri)
      .send({ from: this.owner });
  }

  setPrizeTokenURI(contract, tokenUri) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setPrizeTokenURI(contract, tokenUri)
      .send({ from: this.owner });
  }

  setIntervalTime(contract, interval) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setIntervalTime(contract, interval)
      .send({ from: this.owner });
  }

  getCurrentBalanceInNFTContract(contract) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .getCurrentBalanceInNFTContract(contract)
      .call({ from: this.owner });
  }

  withdrawBalanceInNFTContract(contract, amount) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .withdrawBalanceInNFTContract(contract, amount)
      .send({ from: this.owner });
  }

  transferBattleContractOwnership(contract, newOwner) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .transferBattleContractOwnership(contract, newOwner)
      .send({ from: this.owner });
  }

  performUpkeep(contract) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .performUpkeep(contract)
      .send({ from: this.owner });
  }

  testElimination() {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .testElimination()
      .send({ from: this.owner });
  }

  grantAdminAccess(address) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .grantAdminAccess(address)
      .send({ from: this.owner, gas: 1000000 });
  }

  grantSupportAccess(address) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .grantSupportAccess(address)
      .send({ from: this.owner, gas: 1000000 });
  }

  revokeAccessRole(address) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .revokeAccessRole(address)
      .send({ from: this.owner, gas: 1000000 });
  }

  getAddressRole(address) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .getAddressRole(address)
      .call({ from: this.owner });
  }

  getAllAccessAddresses() {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .getAllAccessAddresses()
      .call({ from: this.owner });
  }
}

module.exports = BattleRoyaleArena;
