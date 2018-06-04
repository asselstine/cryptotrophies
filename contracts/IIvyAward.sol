pragma solidity ^0.4.23;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract IIvyAward is ERC721 {
  event BoughtAward(address indexed buyer, uint256 indexed awardId, address indexed recipient);
  event UpdatedAward(address indexed buyer, uint256 indexed awardId, address indexed recipient);

  function buyAward (
    uint256 _awardGenes,
    string _title,
    string _inscription,
    address _recipient
  ) external payable;
  function updateAward (
    uint256 _awardId,
    uint256 _awardGenes,
    string _title,
    string _inscription,
    address _recipient
  ) external payable;
  function issuedAwards () external view returns (uint256[]);
  function ownedAwards () external view returns (uint256[]);
  function getAward(uint256 _awardId) external view returns (uint256 awardType_, string awardTitle_, string awardInscription_, address awardRecipient_);
  function setCurrentPrice(uint256 newPrice) public;
  function getCurrentPrice() external view returns (uint256 price);
}
