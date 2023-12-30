// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract demo {
  string a;
  address owner;
  
  constructor() public {
    a="Hello";
    owner=msg.sender;
  }
  
  modifier onlyOwner {
    require(owner==msg.sender,"Only Owner");
    _;
  }

  function storeMessage(string memory b) onlyOwner public{
    a=b;
  }

  function viewMessage() public view returns(string memory){
    return a;
  }
}
