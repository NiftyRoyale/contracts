const { Contract } = require('../block3');

class ChainlinkRegistry extends Contract {
  addFunds(id, amount) {
    return this.contract
      .methods
      .addFunds(id, amount)
      .send({ from: this.owner });
  }

  getUpkeep(id) {
    return this.contract
      .methods
      .getUpkeep(id)
      .call({ from: this.owner });
  }

  getUpkeepCount() {
    return this.contract
      .methods
      .getUpkeepCount()
      .call();
  }
}

module.exports = ChainlinkRegistry;
