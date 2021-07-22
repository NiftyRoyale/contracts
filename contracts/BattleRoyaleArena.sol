// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@chainlink/contracts/src/v0.6/VRFConsumerBase.sol";
import "./BattleRoyale.sol";
import "./AddressArray.sol";
import "./CustomAccessControl.sol";

contract BattleRoyaleArena is CustomAccessControl, VRFConsumerBase {
  using AddressArray for AddressArray.Addresses;
  AddressArray.Addresses battleQueue;
  address payable public walletAddress; // Address of primary wallet

  // Chainlink properties
  bytes32 internal keyHash;
  uint256 public fee;

  // Temp mapping for battles in random elimination mechanic
  mapping(bytes32 => address payable) requestToBattle;
  mapping(address => bool) eliminationState;

  constructor(
    address _vrfCoordinator,
    address _linkToken,
    bytes32 _keyHash,
    uint256 _fee
  ) public VRFConsumerBase(_vrfCoordinator, _linkToken) {
    keyHash = _keyHash;
    fee = _fee; // Set to Chainlink fee for network, Rinkeby and Kovan is 0.1 LINK and MAINNET is 2 LINK
    walletAddress = payable(owner());
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
  }

  receive() external payable {} // Fallback function to receive ETH

  // Contract Functions
  function addressToBytes(address payable addr) internal pure returns (bytes memory b) {
    return abi.encodePacked(addr);
  }

  function bytesToAddress(bytes memory bys) internal pure returns (address payable addr) {
    assembly {
      addr := mload(add(bys,20))
    }
  }

  function getBattleQueue() public view returns (address payable[] memory) {
    return battleQueue.getAll();
  }

  function addToBattleQueue(address payable _nftAddress) public payable onlySupport {
    eliminationState[_nftAddress] = false;
    battleQueue.push(_nftAddress);
  }

  function removeBattleFromQueue(address payable nftAddress) public payable onlySupport {
    delete eliminationState[nftAddress];
    battleQueue.remove(nftAddress);
  }

  function isContractInQueue(address payable _contract) public view returns (bool) {
    return battleQueue.exists(_contract);
  }

  function getCurrentBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getCurrentLinkBalance() public view returns (uint256) {
    return LINK.balanceOf(address(this));
  }

  function withdraw(uint256 amount) public payable onlyAdmin {
    uint256 balance = address(this).balance;
    require(amount <= balance);
    if (walletAddress != address(0)) {
      payable(walletAddress).transfer(amount);
    } else {
      msg.sender.transfer(amount);
    }
  }

  function withdrawLink(uint256 amount) public payable onlyAdmin {
    uint256 balance = LINK.balanceOf(address(this));
    require(amount <= balance);
    if (walletAddress != address(0)) {
      LINK.transfer(address(walletAddress), amount);
    } else {
      LINK.transfer(msg.sender, amount);
    }
  }

  function setWalletAddress(address payable _wallet) public payable onlyOwner {
    walletAddress = _wallet;
  }

  function transferContractOwnership(address payable newOwner) public virtual onlyOwner {
    require(newOwner != address(0), "Ownable: new owner is the zero address");
    revokeAccessRole(payable(owner()));
    grantSupportAccess(newOwner);
    transferOwnership(newOwner);
  }

  // Chainlink Functions
  function checkUpkeep(bytes calldata checkData) external returns (bool upkeepNeeded, bytes memory performData) {
    for (uint i = 0; i < battleQueue.size(); i++) {
      address payable nftAddress = battleQueue.atIndex(i);
      BattleRoyale battle = BattleRoyale(nftAddress);
      if (
        battle.battleState() == 1
        && block.timestamp >= battle.lastEliminationTimestamp() + (battle.intervalTime() * 1 minutes)
        && eliminationState[nftAddress] == false
      ) {
        return (true, addressToBytes(nftAddress));
      }
    }
    return (false, checkData);
  }

  function performUpkeep(bytes calldata performData) external onlySupport {
    executeBattle(bytesToAddress(performData));
  }

  function fulfillRandomness(bytes32 _requestId, uint256 _randomNumber) internal override {
    address payable nftAddress = requestToBattle[_requestId];
    BattleRoyale battle = BattleRoyale(nftAddress);
    battle.executeRandomElimination(_randomNumber);
    eliminationState[nftAddress] = false;
    delete requestToBattle[_requestId];
  }

  function gameDidEnd(address payable _address) external payable {
    BattleRoyale battle = BattleRoyale(_address);
    delete eliminationState[_address];
    uint256 balance = battle.getCurrentBalance();
    battle.withdraw(balance);
    battleQueue.remove(_address);
  }

  function executeElimination(address payable _nftAddress) public payable onlySupport {
    require(battleQueue.exists(_nftAddress));
    BattleRoyale battle = BattleRoyale(_nftAddress);

    if (
      battle.battleState() == 1
      && block.timestamp >= battle.lastEliminationTimestamp() + (battle.intervalTime() * 1 minutes)
      && eliminationState[_nftAddress] == false
    ) {
      executeBattle(_nftAddress);
    }
  }

  function executeEliminationByQueue() public payable onlySupport {
    for (uint i = 0; i < battleQueue.size(); i++) {
      executeElimination(battleQueue.atIndex(i));
    }
  }

  function executeBattle(address payable _nftAddress) private view returns (bytes32) {
    BattleRoyale battle = BattleRoyale(_nftAddress);
    require(LINK.balanceOf(address(this)) >= fee);
    require(battle.battleState() == 1);
    require(battle.getInPlaySize() > 1);

    eliminationState[_nftAddress] = true;

    // Adjust queue
    battleQueue.remove(_nftAddress);
    battleQueue.push(_nftAddress);

    bytes32 requestId = requestRandomness(keyHash, fee);
    requestToBattle[requestId] = _nftAddress;

    return requestId;
  }

  // Battle Royale Functions
  function getPlayersInPlay(address payable _nft) view returns (uint256[] memory) {
    BattleRoyale battle = BattleRoyale(_nft);
    return battle.getPlayersInPlay();
  }

  function setIntervalTimeOnNFT(address payable _nft, uint256 _intervalTime) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.setIntervalTime(_intervalTime);
  }

  function setPriceOnNFT(address payable _nft, uint256 _price) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.setPrice(_price);
  }

  function setAutoStartOnNFT(address payable _nft, bool _autoStart) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.setAutoStart(_autoStart);
  }

  function setAutoPayoutOnNFT(address payable _nft, bool _autoPayout) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.setAutoPayout(_autoPayout);
  }

  function setUnitsPerTransactionOnNFT(address payable _nft, uint256 _units) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.setUnitsPerTransaction(_units);
  }

  function setMaxSupplyOnNFT(address payable _nft, uint256 _supply) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.setMaxSupply(_supply);
  }

  function setMaxElimsPerCallOnNFT(address payable _nft, uint256 _elims) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.setMaxElimsPerCall(_elims);
  }

  function setDefaultTokenURIOnNFT(address payable _nft, string memory _tokenUri) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.setDefaultTokenURI(_tokenUri);
  }

  function setPrizeTokenURIOnNFT(address payable _nft, string memory _tokenUri) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.setPrizeTokenURI(_tokenUri);
  }

  function executeBattleOnNFT(address payable _nft) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.executeBattle();
  }

  function executePayoutOnNFT(address payable _nft) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.executePayout();
  }

  function withdrawFromNFT(address payable _nft, uint256 amount) payable onlySupport {
    BattleRoyale battle = BattleRoyale(_nft);
    battle.withdraw(amount);
  }
}
