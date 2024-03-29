pragma solidity ^0.4.23;

import './IIvyAward.sol';
import 'zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol';

contract IvyAward is IIvyAward, ERC721Token {
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

  // A mapping to retain the history of who first purchased this award
  mapping(uint256 => address) awardIssuers;

  // And the number of tokens they own
  mapping(address => uint256) issuedCount;

  constructor () ERC721Token("Ivy Award", "IVY") public {}

  /// The event emitted when an award is purchased
  event BoughtAward(address indexed buyer, uint256 indexed awardId, address indexed recipient);

  /// The event emitted when a pre-existing award is updated
  event UpdatedAward(address indexed buyer, uint256 indexed awardId, address indexed recipient);

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

    address recipientsAddress = _recipient;

    // Start at 1
    uint256 index = allTokens.length + 1;

    // Mint to purchaser or an optionally entered recipient
    if (recipientsAddress == address(0)) {
      recipientsAddress = msg.sender;
    }
    else
    {
      awardRecipients[index] = recipientsAddress;
    }

    _mint(recipientsAddress, index);

    awardGenes[index] = _awardGenes;
    awardTitles[index] = _title;
    awardInscriptions[index] = _inscription;
    awardIssuers[index] = msg.sender;
    issuedCount[msg.sender] += 1;

    emit BoughtAward(msg.sender, index, recipientsAddress);
  }

  /**
   * @dev Updates a previously bought award
   * @param _awardId The index previously set when purchased
   * @param _awardGenes The customization of the award
   * @param _title The updated short title of the award
   * @param _inscription The updated long inscription of the award, intended to reflect the recipient
   * @param _recipient The new recipient of the award
   */
  function updateAward (
    uint256 _awardId,
    uint256 _awardGenes,
    string _title,
    string _inscription,
    address _recipient
  ) external payable {
    bytes memory _titleBytes = bytes(_title);
    bytes memory _inscriptionBytes = bytes(_inscription);

    require(awardIssuers[_awardId] == msg.sender);
    require(_titleBytes.length > TITLE_MIN_LENGTH);
    require(_titleBytes.length <= TITLE_MAX_LENGTH);
    require(_inscriptionBytes.length <= INSCRIPTION_MAX_LENGTH);

    uint256 index = _awardId;

    if (awardGenes[index] != _awardGenes) {
      awardGenes[index] = _awardGenes;
    }
    if (keccak256(awardTitles[index]) != keccak256(_title)) {
      awardTitles[index] = _title;
    }
    if (keccak256(awardInscriptions[index]) != keccak256(_inscription)) {
      awardInscriptions[index] = _inscription;
    }

    // Check to see if the recipient has already been set, and if
    // the _recipient has been passed in correctly
    if (awardRecipients[index] != address(0) && _recipient != address(0)) {
      awardRecipients[index] = _recipient;
    }

    emit UpdatedAward(msg.sender, index, _recipient);
  }

  /**
   * @dev Returns all of the awards that the address has issued
   * @return An array of award indices
   */
  function issuedAwards () external view returns (uint256[]) {
    uint256[] memory awards = new uint256[](issuedCount[msg.sender]);
    uint256 currentIndex = 0;
    for (uint256 i = 0; i < allTokens.length; i++) {
      uint256 tokenId = allTokens[i];
      if (awardIssuers[tokenId] == msg.sender) {
        awards[currentIndex++] = tokenId;
      }
    }
    return awards;
  }

  /**
   * @dev Returns all of the awards that the address owns
   * @return An array of award indices
   */
  function ownedAwards () external view returns (uint256[]) {
    uint256[] memory awards = new uint256[](ownedTokensCount[msg.sender]);
    uint256 currentIndex = 0;
    for (uint256 i = 0; i < allTokens.length; i++) {
      uint256 tokenId = allTokens[i];
      if (tokenOwner[tokenId] == msg.sender) {
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
