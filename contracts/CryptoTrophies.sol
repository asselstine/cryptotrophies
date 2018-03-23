pragma solidity ^0.4.18;

contract CryptoTrophies {
/*
  mapping(uint256 => address) trophyToOwner;
  uint256 trophyCount; */

  mapping(address => uint256) trophyCount;

  mapping(uint256 => uint256) trophyTypes;

  address[] trophyOwners;

  event BoughtTrophy(address indexed buyer, uint256 indexed trophyId);

  function buyTrophy (uint256 _trophyType) external payable {
    trophyCount[msg.sender] += 1;
    var index = (trophyOwners.push(msg.sender) - 1);

    trophyTypes[index] = _trophyType;

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
    return trophyTypes[_trophyId];
  }
}
