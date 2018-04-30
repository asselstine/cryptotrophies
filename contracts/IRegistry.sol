pragma solidity ^0.4.18;

contract IRegistry {
  function register(bytes32 _key, address _contract) external;
  function lookup(bytes32 _key) external view returns (address);
}
