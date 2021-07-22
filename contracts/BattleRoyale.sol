// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "./ERC721Tradable.sol";
import "./AddressArray.sol";
import "./Uint256Array.sol";

contract BattleRoyale is ERC721Tradable {
  using AddressArray for AddressArray.Addresses;
  using Uint256Array for Uint256Array.Uint256s;

  enum BATTLE_STATE { STANDBY, RUNNING, ENDED } // Current game state

  BATTLE_STATE public battleState;
  Uint256Array.Uint256s inPlay; // All NFTs in play
  AddressArray.Addresses purchasers; // Purchaser addresses

  event BattleState(uint256 _state);
  event Elimination(uint256 _tokenId, uint256 _position);

  string public defaultTokenURI; // Prize token URI to be set to winner
  string public prizeTokenURI; // Prize token URI to be set to winner
  uint256 public intervalTime; // Time in minutes
  uint256 public lastEliminationTimestamp; // Timestamp of last elimination

  uint256 public price; // initial price per token
  uint256 public unitsPerTransaction; // current purchasable units per transaction
  uint256 public maxSupply; // Maximum number of mintable tokens
  uint256 public maxElimsPerCall; // Maximum elimination per round
  bool public autoStart; // set to true when wanting the game to start automatically once sales hit max supply
  bool public autoPayout; // set to true when wanting the game to start automatically once sales hit max supply
  address payable public delegate; // Address of the artist

  constructor(
    string memory _name,
    string memory _symbol,
    uint256 _price,
    uint256 _unitsPerTransaction,
    uint256 _maxSupply,
    uint256 _maxElimsPerCall,
    bool _autoStart,
    bool _autoPayout,
    address payable _delegate
  )
  public ERC721Tradable(
    _name,
    _symbol,
    'https://ipfs.io/ipfs/'
  ) {
    battleState = BATTLE_STATE.STANDBY;
    intervalTime = 30;
    price = _price;
    unitsPerTransaction = _unitsPerTransaction;
    maxSupply = _maxSupply;
    autoStart = _autoStart;
    autoPayout = _autoPayout;
    maxElimsPerCall = _maxElimsPerCall;
    delegate = _delegate;
  }

  modifier onlyAdmin {
    require(msg.sender == delegate || msg.sender == owner());
    _;
  }

  function purchase(uint256 units) public payable {
    require(battleState == BATTLE_STATE.STANDBY);
    require(bytes(defaultTokenURI).length > 0);
    require(price > 0);
    require(msg.value >= (price * units));
    require(maxSupply > 0 && inPlay.size() < maxSupply);
    require(units > 0 && units <= unitsPerTransaction && units <= maxSupply - inPlay.size());
    require(purchasers.getIndex(msg.sender) == -1, "Only 1 purchase per account.");

    purchasers.push(msg.sender);

    for (uint256 i = 0; i < units; i++) {
      uint256 tokenId = mintTo(msg.sender);
      _setTokenURI(tokenId, defaultTokenURI);
      inPlay.push(tokenId);
    }

    if (autoStart && maxSupply == inPlay.size()) {
      startBattle();
    }
  }

  function burn(uint256 _tokenId) public virtual {
    require(msg.sender == ownerOf(_tokenId) || msg.sender == delegate || msg.sender == owner());
    inPlay.remove(_tokenId);
    _burn(_tokenId);
  }

  function withdraw(uint256 amount) external override virtual onlyAdmin {
    require(amount <= address(this).balance);
    if (delegate != address(0)) {
      payable(delegate).transfer(amount);
    } else {
      msg.sender.transfer(amount);
    }
  }

  function getPlayersInPlay() public view returns (uint256[] memory) {
    return inPlay.getAll();
  }

  function getInPlaySize() public view returns (uint256) {
    return inPlay.size();
  }

  function setIntervalTime(uint256 _intervalTime) external payable onlyAdmin {
    intervalTime = _intervalTime;
  }

  function setPrice(uint256 _price) external payable onlyAdmin {
    price = _price;
  }

  function setAutoStart(bool _autoStart) external payable onlyAdmin {
    autoStart = _autoStart;
  }

  function setAutoPayout(bool _autoPayout) external payable onlyAdmin {
    autoPayout = _autoPayout;
  }

  function setUnitsPerTransaction(uint256 _units) external payable onlyAdmin {
    unitsPerTransaction = _units;
  }

  function setMaxSupply(uint256 _supply) external payable onlyAdmin {
    maxSupply = _supply;
  }

  function setMaxElimsPerCall(uint256 _maxElimsPerCall) external payable onlyAdmin {
    maxElimsPerCall = _maxElimsPerCall;
  }

  function setDefaultTokenURI(string memory _tokenUri) external payable onlyAdmin {
    defaultTokenURI = _tokenUri;
  }

  function setPrizeTokenURI(string memory _tokenUri) external payable onlyAdmin {
    prizeTokenURI = _tokenUri;
  }

  function executeBattle() external payable onlyAdmin {
    require(bytes(prizeTokenURI).length > 0 && inPlay.size() > 1);
    startBattle();
  }

  function executeRandomElimination(uint256 _randomNumber) external payable onlyAdmin {
    require(battleState == BATTLE_STATE.RUNNING && inPlay.size() > 1);
    uint256[] memory indexes = expand(_randomNumber, maxElimsPerCall);

    for (uint i = 0; i < maxElimsPerCall; i++) {
      uint256 index = indexes[i] % inPlay.size();
      uint256 tokenId = inPlay.atIndex(index);
      uint256 position = inPlay.size() + 1;
      inPlay.remove(tokenId);
      Elimination(tokenId, position);

      if (inPlay.size() == 1) {
        battleState = BATTLE_STATE.ENDED;
        BattleState(battleState);
        winnerTokenId = inPlay.atIndex(0);
        _setTokenURI(winnerTokenId, prizeTokenURI);

        if (autoPayout) {
          this.executePayout();
        }

        break;
      }
    }

    lastEliminationTimestamp = block.timestamp;
  }

  function executePayout() external payable onlyAdmin {
    payable(delegate).transfer(address(this).balance);
  }

  function startBattle() private payable {
    battleState = BATTLE_STATE.RUNNING;
    lastEliminationTimestamp = block.timestamp;
    BattleState(battleState);
  }

  function expand(uint256 randomValue, uint256 n) private pure returns (uint256[] memory expandedValues) {
    expandedValues = new uint256[](n);
    for (uint256 i = 0; i < n; i++) {
      expandedValues[i] = uint256(keccak256(abi.encode(randomValue, i)));
    }
    return expandedValues;
  }
}
