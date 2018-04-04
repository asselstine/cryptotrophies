pragma solidity ^0.4.18;

contract CryptoTrophies {
/*
  mapping(uint256 => address) awardToOwner;
  uint256 awardCount; */

  uint256 constant TITLE_MIN_LENGTH = 8;
  uint256 constant TITLE_MAX_LENGTH = 64;
  uint256 constant INSCRIPTION_MAX_LENGTH = 256;

  mapping(address => uint256) awardCount;
  mapping(uint256 => uint256) awardGenes;
  mapping(uint256 => string) awardTitle;
  mapping(uint256 => string) awardInscription;
  address[] awardOwners;

  event BoughtAward(address indexed buyer, uint256 indexed awardId);

  function buyAward (
    uint256 _awardGenes,
    string _title,
    string _inscription
  ) external payable {
    bytes memory _titleBytes = bytes(_title);
    bytes memory _inscriptionBytes = bytes(_inscription);
    require(_titleBytes.length > TITLE_MIN_LENGTH);
    require(_titleBytes.length <= TITLE_MAX_LENGTH);
    require(_inscriptionBytes.length <= INSCRIPTION_MAX_LENGTH);

    awardCount[msg.sender] += 1;
    var index = (awardOwners.push(msg.sender) - 1);

    awardGenes[index] = _awardGenes;
    awardTitle[index] = _title;
    awardInscription[index] = _inscription;

    BoughtAward(msg.sender, index);
  }

  function myAwards () external view returns (uint256[]) {
    uint256[] memory awards = new uint256[](awardCount[msg.sender]);
    uint256 currentIndex = 0;
    for (uint256 i = 0; i < awardOwners.length; i++) {
      if (awardOwners[i] == msg.sender) {
        awards[currentIndex++] = i;
      }
    }
    return awards;
  }

  function getAwardType (uint256 _awardId) external view returns (uint256) {
    return awardGenes[_awardId];
  }

  function getAwardTitle (uint256 _awardId) external view returns (string) {
    return awardTitle[_awardId];
  }

  function getAwardInscription (uint256 _awardId) external view returns (string) {
    return awardInscription[_awardId];
  }
}
