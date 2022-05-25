// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ITNT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract AirDrop is Ownable {

    ITNT20 token;

    // struct Winner{
    //   address winnerAddress;
    //   uint256 amount;
    // }

    mapping(address => uint256) public winners;
    address [] public winnerIndex;

    constructor(ITNT20 _token){
      token = _token;
    }

    function doAirdrop( address[] memory _addresses) public onlyOwner {
      uint256 i = 0;
      while (i < _addresses.length) {

        if(winners[_addresses[i]] == 0) {
          winners[_addresses[i]] = 60 * (10 ** 16); // desimal token
          winnerIndex.push(_addresses[i]);
          token.transfer(_addresses[i] , 60 * (10 ** 16)); //desimal token
        }
        i += 1;
      }
        
    }

  function getWinners (uint _pageNumber, uint _perPage) public onlyOwner view returns (address[] memory Winner_, uint totalList_) {
    require((_pageNumber * _perPage) <= winnerIndex.length, "Page is Out of Range");
    uint no_winners = (winnerIndex.length - (_pageNumber * _perPage)) < _perPage ?
    (winnerIndex.length - (_pageNumber * _perPage)) : _perPage;
    address[] memory winnersArr = new address[](no_winners);
    for (uint256 i = 0; i < winnersArr.length; i++) {
        winnersArr[i] = winnerIndex[(_pageNumber * _perPage) + i];
    }
    return (winnersArr, winnerIndex.length);
  }




  


}


