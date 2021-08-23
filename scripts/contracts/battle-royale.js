const { Contract } = require('../block3');

class BattleRoyale extends Contract {
  /* Properties */
  maxSupply() {
    return this.contract
      .methods
      .maxSupply()
      .call();
  }
  /**
   * [unitsPerTransaction description]
   * @return {[type]} [description]
   */
  unitsPerTransaction() {
    return this.contract
      .methods
      .unitsPerTransaction()
      .call();
  }
  /**
   * Get Prize Token URI
   * @return {String}
   */
  prizeTokenURI() {
    return this.contract
      .methods
      .prizeTokenURI()
      .call();
  }
  /**
   * Get Default Token URI
   * @return {String}
   */
  defaultTokenURI() {
    return this.contract
      .methods
      .defaultTokenURI()
      .call();
  }
  /**
   * Get Interval Time
   * @param {[type]} time [description]
   */
  intervalTime() {
    return this.contract
      .methods
      .intervalTime()
      .call();
  }
  /**
   * Get timestamp
   * @param {[type]} time [description]
   */
  timestamp() {
    return this.contract
      .methods
      .timestamp()
      .call();
  }
  /**
   * return current price in ETH
   * @return {number} ETH price
   */
  price() {
    return this.contract
      .methods
      .price()
      .call();
  }

  // maxElimsPerCall() {
  //   return this.contract
  //     .methods
  //     .maxElimsPerCall()
  //     .call();
  // }
  /**
   * Begin Battle - Method to begin game, can only be called by contract owner
   * @return {[type]} [description]
   */
  beginBattle() {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .beginBattle()
      .send({ from: this.owner });
  }
  /**
   * Get Token ID By Owner
   * @param  {String} address address of token holder
   * @return {Number}         [description]
   */
  getTokenIdByOwner(address) {
    return this.contract
      .methods
      .getTokenIdByOwner(address)
      .call();
  }
  /**
   * Is Token In Play
   * @param  {[type]}  id [description]
   * @return {Boolean}    [description]
   */
  isTokenInPlay(id) {
    return this.contract
      .methods
      .isTokenInPlay(id)
      .call();
  }
  /**
   * Total Supply - total count of tokens in contract
   * @return {[type]} [description]
   */
  totalSupply() {
    return this.contract
      .methods
      .totalSupply()
      .call();
  }
  /**
   * Get all royales
   * @return {[type]} [description]
   */
  royales() {
    return this.contract
      .methods
      .royales()
      .call();
  }
  /**
   * Get All In Play
   * @return {[type]} [description]
   */
  getInPlay() {
    return this.contract
      .methods
      .getInPlay()
      .call();
  }
  /**
   * Get All Out Of Play
   * @return {[type]} [description]
   */
  getOutOfPlay() {
    return this.contract
      .methods
      .getOutOfPlay()
      .call();
  }
  /**
   * Set Interval Time - Can only be executed by contract owner
   * @param {[type]} time [description]
   */
  setIntervalTime(time) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setIntervalTime(time)
      .send({ from: this.owner });
  }
  /**
   * Set Default Token URI - Can only be executed by contract owner
   * @param {[type]} uri [description]
   */
  setDefaultTokenURI(uri) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setDefaultTokenURI(uri)
      .send({ from: this.owner });
  }

  setMaxElimsPerCall(elims) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setMaxElimsPerCall(elims)
      .send({ from: this.owner });
  }
  /**
   * Set Prize Token URI - Can only be executed by contract owner
   * @param {[type]} uri [description]
   */
  setPrizeTokenURI(uri) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setPrizeTokenURI(uri)
      .send({ from: this.owner });
  }
  /**
   * withdraw all ETH from contract - Can only be executed by contract owner
   */
  withdraw(amount) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .withdraw(amount)
      .send({ from: this.owner });
  }
  /**
   * Get Current ETH Balance in contract - Can only be executed by contract owner
   */
  getCurrentBalance() {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .getCurrentBalance()
      .call({ from: this.owner });
  }
  /**
   * Purchase token method
   * @param  {Number} units number of units to purchase
   * @param  {Number} value number of ETH to pay
   */
  purchase(units, value) {
    if (!this.owner || !value) {
      return Promise.reject(new Error("Owner and value is required"));
    }
    return this.contract
      .methods
      .purchase(units)
      .send({ from: this.owner, value });
  }
  /**
   * Get Token Placement after elimination
   * @param  {[type]} id [description]
   */
  getTokenPlacement(id) {
    return this.contract
      .methods
      .getTokenPlacement(id)
      .call();
  }
  /**
   * Set Price of token in ETH - Can only be executed by contract owner
   * @param {[type]} price [description]
   */
  setPrice(price) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }

    return this.contract
      .methods
      .setPrice(`${price * 10**18}`)
      .send({ from: this.owner });
  }
  /**
   * Set max units that can be purchased per transaction - Can only be executed by contract owner
   * @param {[type]} units [description]
   */
  setUnitsPerTransaction(units) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setUnitsPerTransaction(units)
      .send({ from: this.owner });
  }
  /**
   * Set Max Supply of tokens that can be purchased - Can only be executed by contract owner
   * @param {[type]} supply [description]
   */
  setMaxSupply(supply) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .setMaxSupply(supply)
      .send({ from: this.owner });
  }
  /**
   * Get Current Battle State
   * @return {String} Potential States: STANDBY, RUNNING, ENDED
   */
  getBattleState() {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .getBattleState()
      .call({ from: this.owner });
  }

  executeRandomElimination(randomNumber) {
    if (!this.owner) {
      return Promise.reject(new Error("Owner is required"));
    }
    return this.contract
      .methods
      .executeRandomElimination(randomNumber)
      .send({ from: this.owner });
  }
}

module.exports = BattleRoyale;
