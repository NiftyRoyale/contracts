// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BattleRoyale.sol";
import "./BattleRoyaleArena.sol";

contract BattleRoyaleFactory is Ownable {
  address payable public arenaContract;
  constructor() public {}

  function create(
    string memory _name,
    string memory _symbol,
    uint256 _price,
    uint256 _supply,
    bool _gateway,
    bool _autoStart,
    bool _autoPayout
  ) external onlyOwner {
    require(arenaContract != address(0));
    BattleRoyaleArena arena = BattleRoyaleArena(arenaContract);
    BattleRoyale royale = new BattleRoyale(_name, _symbol, _price, _supply, _gateway, _autoStart, _autoPayout, arenaContract);

    arena.addToBattleQueue(address(royale));
  }

  function setArenaContract(address payable _arenaContract) external payable onlyOwner {
    require(_arenaContract != address(0));
    arenaContract = _arenaContract;
  }
}
