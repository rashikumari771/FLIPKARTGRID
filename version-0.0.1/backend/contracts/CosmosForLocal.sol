// contracts/CosmosForLocal.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import {User} from "./User.sol";
import {Transaction} from "./Transaction.sol";
import {Wallet} from "./Wallet.sol";


contract CosmosForLocal is User,Transaction,Wallet{
    // This is the total supply of the token
    uint256 public totalSupply;

    // This is the name of the token
    string public  name;

    // This is the symbol of the token
    string public  symbol;

    // This is the owner of the contract
    address public ownerAddres;
    
    // This is the event that will be emitted when the transfer is successful
    event Transfer(address indexed from, address indexed to, uint256 value);

    // This function will add the partner
    function addPartner(user memory _person) public virtual returns (bool success){}

    // This function will remove the partner
    function removePartner(address _partner) public virtual returns (bool success){}

    // This function will transfer the tokens from the sender to the receiver
    function transfer( address _to, uint256 _value ) public virtual returns (bool success){}

    // This function will transfer the tokens from the sender to the receiver
    function transferFrom( address _from, address _to, uint256 _value ) public virtual returns  (bool success){}

    // This function will mint the tokens to the receiver
    function mint(address _to, uint256 _value) public virtual returns (bool success){}

    // This function will burn the tokens from the sender
    function burn(uint256 _value) public virtual returns (bool success){}

    // This function will reward the tokens to the sender
    function reward( address _partner, uint256 _value ) public virtual returns (bool success){}

    // This function will redeem the tokens from the sender
    function redeem(uint256 _value) public virtual returns (bool success){}
}
