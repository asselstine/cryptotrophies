pragma solidity ^0.4.18;

import "./Owned.sol";
import "./IRegistry.sol";

contract Registry is Owned, IRegistry {
  mapping(bytes32 => address) registry;

  function Registry() public {
    setOwner(msg.sender);
  }

  function register(bytes32 _key, address _targetContract) external onlyOwner {
    require(_targetContract != address(0));
    registry[_key] = _targetContract;
  }

  function lookup(bytes32 _key) external view returns (address) {
    return registry[_key];
  }
}
