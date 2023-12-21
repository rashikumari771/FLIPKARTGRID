// contracts/LoayaltyProgram.sol
// SPDX-License-Identifier: MIT

// This is the main contract
// for the Cosmos Token (CMOS)
// It will be used for loyality programs and rewards
// for the Flipkart customers
pragma solidity ^0.8.17;

import {CosmosForLocal} from "./CosmosForLocal.sol";

contract LoyaltyProgram is CosmosForLocal {
    // this will map the User with their address
    mapping(address => user) public addressToUser;
    mapping(address => transaction[]) public addressToTransactions;
    mapping(address => wallet) public addressToWallet;

    // store the address
    address[] public keys;

    // This is the constructor It will be called only once
    constructor(
        uint256 _initialSupply,
        string memory _name,
        string memory _symbol
    ) {
        // Set the total supply
        totalSupply = _initialSupply;

        //set the the symbol of the token
        symbol = _symbol;

        // set the name of the token
        name = _name;

        // Set the owner of the contract
        ownerAddres = msg.sender;

        // Set the balance of the contract creator
        addressToWallet[msg.sender].amount = _initialSupply;

        // Emit the transfer event
        emit Transfer(address(0), msg.sender, _initialSupply);

        // Add the transaction to the transactions mapping
        addressToTransactions[msg.sender].push(
            transaction(address(0), msg.sender, _initialSupply)
        );
        addPartner(user("owner", 1, msg.sender, "Hi i am Avinesh", "", ""));
    }

    // This function will return the partners
    function getPartners() public view returns (address[] memory) {
        uint numPartners = 0;
        uint ind = 0;
        for (uint256 i = 0; i < keys.length; i++) {
            if (addressToUser[keys[i]].utype == 1) {
                numPartners++;
            }
        }
        address[] memory partners = new address[](numPartners);

        for (uint256 i = 0; i < keys.length; i++) {
            if (addressToUser[keys[i]].utype == 1) {
                partners[ind] = addressToUser[keys[i]].userAddress;
                ind++;
            }
        }

        return partners;
    }

    // This function will return the partners
    function getCustomer() public view returns (address[] memory) {
        uint numPartners = 0;
        uint ind = 0;
        for (uint256 i = 0; i < keys.length; i++) {
            if (addressToUser[keys[i]].utype == 2) {
                numPartners++;
            }
        }
        address[] memory partners = new address[](numPartners);

        for (uint256 i = 0; i < keys.length; i++) {
            if (addressToUser[keys[i]].utype == 2) {
                partners[ind] = addressToUser[keys[i]].userAddress;
                ind++;
            }
        }

        return partners;
    }

    // This function will return the partners
    function getall() public view returns (address[] memory) {
        uint numPartners = keys.length;
        uint ind = 0;
        address[] memory partners = new address[](numPartners);

        for (uint256 i = 0; i < keys.length; i++) {
            partners[ind] = addressToUser[keys[i]].userAddress;
            ind++;
        }

        return partners;
    }

    // This function will return the transactions of the sender
    function getTransactions(
        address _address
    ) public view returns (transaction[] memory) {
        // Return the transactions of the sender
        return addressToTransactions[_address];
    }

    // This function will return the balance of the sender
    function getBalance() public view returns (uint256) {
        // Return the balance of the sender
        return addressToWallet[msg.sender].amount;
    }

    function addPartner(
        user memory _person
    ) public override returns (bool success) {
        // Check if the sender is the contract creator
        require(msg.sender == ownerAddres);

        // Add the partner to the partners array
        keys.push(_person.userAddress);
        addressToUser[_person.userAddress] = _person;
        addressToWallet[_person.userAddress] = wallet(symbol, 0, 0);

        // Return true
        return true;
    }

    // This function will remove the partner
    function removePartner(
        address _partnerAddress
    ) public override returns (bool success) {
        // Check if the sender is the contract creator
        require(msg.sender == ownerAddres);

        // Loop through the partners array
        for (uint256 i = 0; i < keys.length; i++) {
            // Check if the partner is found
            if (keys[i] == _partnerAddress) {
                // Remove the partner from the partners array
                keys[i] = keys[keys.length - 1];
                delete addressToUser[_partnerAddress];
                delete addressToTransactions[_partnerAddress];
                delete addressToWallet[_partnerAddress];
                keys.pop();

                // Return true
                return true;
            }
        }
        // Return false
        return false;
    }

    // This function will transfer the tokens from the sender to the receiver
    function transfer(
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        // Check if the sender has enough tokens
        require(addressToWallet[msg.sender].amount >= _value);

        // Subtract the tokens from the sender
        addressToWallet[msg.sender].amount -= _value;

        // Add the tokens to the receiver
        addressToWallet[_to].amount += _value;

        // Add the transaction to the transactions mapping
        addressToTransactions[msg.sender].push(
            transaction(msg.sender, _to, _value)
        );
        addressToTransactions[_to].push(transaction(msg.sender, _to, _value));

        // Emit the transfer event
        emit Transfer(msg.sender, _to, _value);

        // Return true
        return true;
    }

    // This function will transfer the tokens from the sender to the receiver
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        // Check if the sender is the contract creator
        require(msg.sender == ownerAddres);
        // Check if the sender has enough tokens
        require(addressToWallet[_from].amount >= _value);

        // Subtract the tokens from the sender
        addressToWallet[_from].amount -= _value;

        // Add the tokens to the receiver
        addressToWallet[_to].amount -= _value += _value;

        // Add the transaction to the transactions mapping
        addressToTransactions[_from].push(transaction(_from, _to, _value));
        addressToTransactions[_to].push(transaction(_from, _to, _value));

        // Emit the transfer event
        emit Transfer(_from, _to, _value);

        // Return true
        return true;
    }

    // This function will mint the tokens to the receiver
    function mint(
        address _to,
        uint256 _value
    ) public override returns (bool success) {
        // Check if the sender is the contract creator
        require(msg.sender == ownerAddres);

        // Add the tokens to the receiver
        addressToWallet[_to].amount += _value;

        // Add the tokens to the total supply
        totalSupply += _value;

        // Add the transaction to the transactions mapping
        addressToTransactions[_to].push(transaction(address(0), _to, _value));

        // Emit the transfer event
        emit Transfer(address(0), _to, _value);

        // Return true
        return true;
    }

    // This function will burn the tokens from the sender
    function burn(uint256 _value) public override returns (bool success) {
        // Check if the sender has enough tokens
        require(addressToWallet[msg.sender].amount >= _value);

        // Subtract the tokens from the sender
        addressToWallet[msg.sender].amount -= _value;

        // Subtract the tokens from the total supply
        totalSupply -= _value;

        // Add the transaction to the transactions mapping
        addressToTransactions[msg.sender].push(
            transaction(msg.sender, address(0), _value)
        );

        // Emit the transfer event
        emit Transfer(msg.sender, address(0), _value);

        // Return true
        return true;
    }

    // This function will reward the tokens to the sender
    function reward(
        address _partner,
        uint256 _value
    ) public override returns (bool success) {
        // require partner to be in authorised partners
        // Loop through the partners array
        // bool hasPartner = addressToUser[_partner].utype==1;

        // require(hasPartner == true);

        // calculate the tokens according to value
        uint256 tokensValue = _value / 100;

        // Check if the partner has enough tokens
        require(addressToWallet[_partner].amount >= tokensValue);

        // subtract the tokens from the partner
        addressToWallet[_partner].amount -= tokensValue;

        // add the tokens to the sender
        addressToWallet[msg.sender].amount += tokensValue;

        // Add the transaction to the transactions mapping
        addressToTransactions[msg.sender].push(
            transaction(_partner, msg.sender, _value)
        );
        addressToTransactions[_partner].push(
            transaction(_partner, msg.sender, _value)
        );

        // return true
        return true;
    }

    // This function will redeem the tokens from the sender
    function redeem(uint256 _value) public override returns (bool success) {
        // Check if the sender has enough tokens
        require(addressToWallet[msg.sender].amount >= _value);

        // Subtract the tokens from the sender
        addressToWallet[msg.sender].amount -= _value;

        // Subtract the tokens from the total supply
        totalSupply -= _value;

        // Add the transaction to the transactions mapping
        addressToTransactions[msg.sender].push(
            transaction(msg.sender, address(0), _value)
        );

        // Emit the transfer event
        emit Transfer(msg.sender, address(0), _value);

        // Return true
        return true;
    }
}
