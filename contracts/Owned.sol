pragma solidity ^0.4.18;

contract Owned {
  bytes32 private constant ownerPosition = keccak256("org.ivyawards.owned.owner");

  event TransferredOwnership(address previousOwner, address newOwner);

  modifier onlyOwner() {
    require(msg.sender == getOwner());
    _;
  }

  function transferOwnership(address _newOwner) onlyOwner external {
    address owner = getOwner();
    require(_newOwner != address(0));
    require(_newOwner != owner);
    TransferredOwnership(owner, _newOwner);
    setOwner(_newOwner);
  }

  function getOwner() internal view returns (address owner) {
    bytes32 position = ownerPosition;
    assembly {
      owner := sload(position)
    }
  }

  function setOwner(address _owner) internal {
    bytes32 position = ownerPosition;
    assembly {
      sstore(position, _owner)
    }
  }
}
