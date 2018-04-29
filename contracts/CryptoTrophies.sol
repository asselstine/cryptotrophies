pragma solidity ^0.4.23;

import './ICryptoTrophies.sol';
import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';

contract CryptoTrophies is ICryptoTrophies, ERC721Token {
  uint256 constant TITLE_MIN_LENGTH = 8;
  uint256 constant TITLE_MAX_LENGTH = 64;
  uint256 constant INSCRIPTION_MAX_LENGTH = 256;

  /// The award configuration
  mapping(uint256 => uint256) awardGenes;

  /// The title of the award
  mapping(uint256 => string) awardTitles;

  /// The inscription of the award
  mapping(uint256 => string) awardInscriptions;

  /// The recipient of the award
  mapping(uint256 => address) awardRecipients;

  mapping(uint256 => address) awardIssuers;
  mapping(address => uint256) issueCounts;

  constructor () ERC721Token("Ivy Award", "IVY") public {}

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
    require(_titleBytes.length > TITLE_MIN_LENGTH, "Title is too short");
    require(_titleBytes.length <= TITLE_MAX_LENGTH, "Title is too long");
    require(_inscriptionBytes.length <= INSCRIPTION_MAX_LENGTH, "Inscription is too long");
    require(_recipient != address(0), "Recipient is 0x0");

    // Start at 1
    uint256 index = allTokens.length + 1;

    // Mint to recipient
    _mint(_recipient, index);

    awardGenes[index] = _awardGenes;
    awardTitles[index] = _title;
    awardInscriptions[index] = _inscription;
    awardRecipients[index] = _recipient;
    awardIssuers[index] = msg.sender;
    issueCounts[msg.sender] += 1;

    emit BoughtAward(msg.sender, index, _recipient);
  }

  /**
   * @dev Returns all of the awards that the user owns
   * @return An array of award indices
   */
  function issuedAwards () external view returns (uint256[]) {
    uint256[] memory awards = new uint256[](issueCounts[msg.sender]);
    uint256 currentIndex = 0;
    for (uint256 i = 0; i < allTokens.length; i++) {
      uint256 tokenId = allTokens[i];
      if (awardIssuers[tokenId] == msg.sender) {
        awards[currentIndex++] = tokenId;
      }
    }
    return awards;
  }

  function awardType (uint256 _awardId) external view returns (uint256) {
    return awardGenes[_awardId];
  }

  function awardTitle (uint256 _awardId) external view returns (string) {
    return awardTitles[_awardId];
  }

  function awardInscription (uint256 _awardId) external view returns (string) {
    return awardInscriptions[_awardId];
  }

  function awardRecipient (uint256 _awardId) external view returns (address) {
    return awardRecipients[_awardId];
  }
}
