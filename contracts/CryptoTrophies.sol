pragma solidity ^0.4.18;

contract CryptoTrophies {
/*
  mapping(uint256 => address) trophyToOwner;
  uint256 trophyCount; */

  uint256 constant TITLE_MIN_LENGTH = 8;
  uint256 constant TITLE_MAX_LENGTH = 64;
  uint256 constant INSCRIPTION_MAX_LENGTH = 256;

  mapping(address => uint256) trophyCount;
  mapping(uint256 => uint256) trophyType;
  mapping(uint256 => string) trophyTitle;
  mapping(uint256 => string) trophyInscription;
  address[] trophyOwners;

  event BoughtTrophy(address indexed buyer, uint256 indexed trophyId);

  function buyTrophy (uint256 _trophyType, string _title, string _inscription) external payable {
    bytes memory _titleBytes = bytes(_title);
    bytes memory _inscriptionBytes = bytes(_inscription);
    require(_titleBytes.length > TITLE_MIN_LENGTH);
    require(_titleBytes.length <= TITLE_MAX_LENGTH);
    require(_inscriptionBytes.length <= INSCRIPTION_MAX_LENGTH);

    trophyCount[msg.sender] += 1;
    var index = (trophyOwners.push(msg.sender) - 1);

    trophyType[index] = _trophyType;
    trophyTitle[index] = _title;
    trophyInscription[index] = _inscription;

    BoughtTrophy(msg.sender, index);
  }

  function myTrophies () external view returns (uint256[]) {
    uint256[] memory trophies = new uint256[](trophyCount[msg.sender]);
    uint256 currentIndex = 0;
    for (uint256 i = 0; i < trophyOwners.length; i++) {
      if (trophyOwners[i] == msg.sender) {
        trophies[currentIndex++] = i;
      }
    }
    return trophies;
  }

  function getTrophyType (uint256 _trophyId) external view returns (uint256) {
    return trophyType[_trophyId];
  }

  function getTrophyTitle (uint256 _trophyId) external view returns (string) {
    return trophyTitle[_trophyId];
  }

  function getTrophyInscription (uint256 _trophyId) external view returns (string) {
    return trophyInscription[_trophyId];
  }
}
