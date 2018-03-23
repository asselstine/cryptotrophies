pragma solidity ^0.4.18;

contract CryptoTrophies {
/*
  mapping(uint256 => address) trophyToOwner;
  uint256 trophyCount; */

  mapping(address => uint256) trophyCount;
  address[] trophyOwners;

  function buyTrophy () external payable {
    trophyCount[msg.sender] += 1;
    trophyOwners.push(msg.sender);
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
}
