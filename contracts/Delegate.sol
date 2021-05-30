// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Delegate is Ownable {
  address payable private _delegate;

  event DelegateTransferred(address indexed previousDelegate, address indexed newDelegate);

  constructor(address payable _d) public {
    _delegate = _d;

    emit DelegateTransferred(address(0), _d);
  }

  function setDelegate(address payable _d) external payable onlyOwner {
    address payable previousDelegate = delegate();
    _delegate = _d;
    emit DelegateTransferred(previousDelegate, _d);
  }

  function delegate() public view virtual returns (address payable delegate) {
    return _delegate;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyDelegate() {
    require(delegate() == _msgSender(), "Delegate: caller is not the delegate");
    _;
  }

  modifier delegateOrOwner() {
    require(delegate() == _msgSender() || owner() == _msgSender(), "Delegate: Caller does not have access");
    _;
  }
}
