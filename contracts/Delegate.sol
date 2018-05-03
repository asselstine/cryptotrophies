pragma solidity ^0.4.23;

import "./Owned.sol";
import "./IRegistry.sol";

contract Delegate is Owned {
  bytes32 private constant registryPosition = keccak256("org.ivyawards.delegate.registry");
  bytes32 private constant keyPosition = keccak256("org.ivyawards.delegate.key");

  constructor (address registry, bytes32 key) public {
    require(registry != address(0));
    require(key != 0);
    setOwner(msg.sender);
    setRegistry(registry);
    setKey(key);
  }

  function getRegistry() public view returns (address impl) {
    bytes32 position = registryPosition;
    assembly {
      impl := sload(position)
    }
  }

  function getKey() public view returns (bytes32 key) {
    bytes32 position = keyPosition;
    assembly {
      key := sload(position)
    }
  }

  function setRegistry(address registry) private {
    bytes32 position = registryPosition;
    assembly {
      sstore(position, registry)
    }
  }

  function setKey(bytes32 key) private {
    bytes32 position = keyPosition;
    assembly {
      sstore(position, key)
    }
  }

  /**
  * @dev Tells the address of the implementation where every call will be delegated.
  * @return address of the implementation to which it will be delegated
  */
  function implementation() public view returns (address) {
    IRegistry registry = IRegistry(getRegistry());
    return registry.lookup(getKey());
  }

  /**
  * @dev Fallback function allowing to perform a delegatecall to the given implementation.
  * This function will return whatever the implementation call returns
  */
  function () payable public {
    address _impl = implementation();
    require(_impl != address(0));

    assembly {
      let ptr := mload(0x40)
      calldatacopy(ptr, 0, calldatasize)
      let result := delegatecall(gas, _impl, ptr, calldatasize, 0, 0)
      let size := returndatasize
      returndatacopy(ptr, 0, size)

      switch result
      case 0 { revert(ptr, size) }
      default { return(ptr, size) }
    }
  }
}
