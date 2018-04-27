pragma solidity ^0.4.18;

contract ICryptoTrophies {
  /// The event emitted when an award is purchased
  event BoughtAward(address indexed buyer, uint256 indexed awardId, address indexed recipient);

  function buyAward (
    uint256 _awardGenes,
    string _title,
    string _inscription,
    address _recipient
  ) external payable;
  function myAwards () external view returns (uint256[]);
  function getAwardType (uint256 _awardId) external view returns (uint256);
  function getAwardTitle (uint256 _awardId) external view returns (string);
  function getAwardInscription (uint256 _awardId) external view returns (string);
  function getAwardRecipient (uint256 _awardId) external view returns (address);
}
