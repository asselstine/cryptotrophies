pragma solidity ^0.4.18;

import './ICryptoTrophies.sol';

contract CryptoTrophies is ICryptoTrophies {
  uint256 constant TITLE_MIN_LENGTH = 8;
  uint256 constant TITLE_MAX_LENGTH = 64;
  uint256 constant INSCRIPTION_MAX_LENGTH = 256;

  /// The number of awards each owner holds
  mapping(address => uint256) awardCount;

  /// The award configuration
  mapping(uint256 => uint256) awardGenes;

  /// The title of the award
  mapping(uint256 => string) awardTitle;

  /// The inscription of the award
  mapping(uint256 => string) awardInscription;

  /// The recipient of the award
  mapping(uint256 => address) awardRecipient;

  /// The owner / issuer of the award
  address[] awardOwners;

  /**
   * @dev Creates an award
   * @param _awardGenes The customization of the award
   * @param _title The short title of the award
   * @param _inscription The long inscription of the award, intended to reflect the recipient
   * @param _recipient The recipient of the award
   */
  function buyAward (
    uint256 _awardGenes,
    string _title,
    string _inscription,
    address _recipient
  ) external payable {
    bytes memory _titleBytes = bytes(_title);
    bytes memory _inscriptionBytes = bytes(_inscription);
    require(_titleBytes.length > TITLE_MIN_LENGTH);
    require(_titleBytes.length <= TITLE_MAX_LENGTH);
    require(_inscriptionBytes.length <= INSCRIPTION_MAX_LENGTH);
    require(_recipient != address(0));

    awardCount[msg.sender] += 1;
    var index = (awardOwners.push(msg.sender) - 1);

    awardGenes[index] = _awardGenes;
    awardTitle[index] = _title;
    awardInscription[index] = _inscription;
    awardRecipient[index] = _recipient;

    BoughtAward(msg.sender, index, _recipient);
  }

  /**
   * @dev Returns all of the awards that the user owns
   * @return An array of award indices
   */
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

  function getAwardRecipient (uint256 _awardId) external view returns (address) {
    return awardRecipient[_awardId];
  }
}
