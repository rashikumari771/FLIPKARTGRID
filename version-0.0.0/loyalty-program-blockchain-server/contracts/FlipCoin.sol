// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

// This is the main contract
// for the FlipCoin Token (FLIP)
// It will be used for loyality programs and rewards
// for the Flipkart customers
contract FlipCoin {
    // This is the total supply of the token
    uint256 public totalSupply;

    // This is the name of the token
    string public constant name = "FlipCoin";

    // This is the symbol of the token
    string public constant symbol = "FLIP";

    // This is the owner of the contract
    address public owner;

    // This is the mapping of the balances
    mapping(address => uint256) public balanceOf;

    // This is the Transaction object
    struct Transaction {
        address from;
        address to;
        uint256 value;
    }

    // This is the mapping of the transactions of the sender
    mapping(address => Transaction[]) public transactions;

    struct Partner {
        string name;
        address partner;
    }

    // This is the array of partners
    Partner[] public partners;

    // This is the event that will be emitted
    // when the transfer is successful
    event Transfer(address indexed from, address indexed to, uint256 value);

    // This is the constructor
    // It will be called only once
    constructor(uint256 _initialSupply) {
        // Set the total supply
        totalSupply = _initialSupply;

        // Set the owner of the contract
        owner = msg.sender;

        // Set the balance of the contract creator
        balanceOf[msg.sender] = _initialSupply;

        // Emit the transfer event
        emit Transfer(address(0), msg.sender, _initialSupply);

        // Add the transaction to the transactions mapping
        transactions[msg.sender].push(
            Transaction(address(0), msg.sender, _initialSupply)
        );
        // adding owner as partner 
       addPartner("Owner", msg.sender);
    }

    // This function will add the partner
    function addPartner(
        string memory _name,
        address _partner
    ) public returns (bool success) {
        // Check if the sender is the contract creator
        require(msg.sender == owner);

        // Add the partner to the partners array
        partners.push(Partner(_name, _partner));

        // Return true
        return true;
    }

    // This function will remove the partner
    function removePartner(address _partner) public returns (bool success) {
        // Check if the sender is the contract creator
        require(msg.sender == owner);

        // Loop through the partners array
        for (uint256 i = 0; i < partners.length; i++) {
            // Check if the partner is found
            if (partners[i].partner == _partner) {
                // Remove the partner from the partners array
                partners[i] = partners[partners.length - 1];
                partners.pop();

                // Return true
                return true;
            }
        }

        // Return false
        return false;
    }

    // This function will return the balance of the sender
    function getBalance() public view returns (uint256) {
        // Return the balance of the sender
        return balanceOf[msg.sender];
    }

    // This function will transfer the tokens
    // from the sender to the receiver
    function transfer(
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // Check if the sender has enough tokens
        require(balanceOf[msg.sender] >= _value);

        // Subtract the tokens from the sender
        balanceOf[msg.sender] -= _value;

        // Add the tokens to the receiver
        balanceOf[_to] += _value;

        // Add the transaction to the transactions mapping
        transactions[msg.sender].push(Transaction(msg.sender, _to, _value));
        transactions[_to].push(Transaction(msg.sender, _to, _value));

        // Emit the transfer event
        emit Transfer(msg.sender, _to, _value);

        // Return true
        return true;
    }

    // This function will transfer the tokens
    // from the sender to the receiver
    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        // Check if the sender is the contract creator
        require(msg.sender == owner);
        // Check if the sender has enough tokens
        require(balanceOf[_from] >= _value);

        // Subtract the tokens from the sender
        balanceOf[_from] -= _value;

        // Add the tokens to the receiver
        balanceOf[_to] += _value;

        // Add the transaction to the transactions mapping
        transactions[_from].push(Transaction(_from, _to, _value));
        transactions[_to].push(Transaction(_from, _to, _value));

        // Emit the transfer event
        emit Transfer(_from, _to, _value);

        // Return true
        return true;
    }

    // This function will mint the tokens
    // to the receiver
    function mint(address _to, uint256 _value) public returns (bool success) {
        // Check if the sender is the contract creator
        require(msg.sender == owner);

        // Add the tokens to the receiver
        balanceOf[_to] += _value;

        // Add the tokens to the total supply
        totalSupply += _value;

        // Add the transaction to the transactions mapping
        transactions[_to].push(Transaction(address(0), _to, _value));

        // Emit the transfer event
        emit Transfer(address(0), _to, _value);

        // Return true
        return true;
    }

    // This function will burn the tokens
    // from the sender
    function burn(uint256 _value) public returns (bool success) {
        // Check if the sender has enough tokens
        require(balanceOf[msg.sender] >= _value);

        // Subtract the tokens from the sender
        balanceOf[msg.sender] -= _value;

        // Subtract the tokens from the total supply
        totalSupply -= _value;

        // Add the transaction to the transactions mapping
        transactions[msg.sender].push(
            Transaction(msg.sender, address(0), _value)
        );

        // Emit the transfer event
        emit Transfer(msg.sender, address(0), _value);

        // Return true
        return true;
    }

    // This function will return the transactions
    // of the sender
    function getTransactions(
        address _address
    ) public view returns (Transaction[] memory) {
        // Return the transactions of the sender
        return transactions[_address];
    }

    // This function will return the partners
    function getPartners() public view returns (Partner[] memory) {
        // Return the partners
        return partners;
    }

    // This function will reward the tokens
    // to the sender
    function reward(
        address _partner,
        uint256 _value
    ) public returns (bool success) {
        // require partner to be in authorised partners
        // Loop through the partners array
        bool hasPartner = false;
        for (uint256 i = 0; i < partners.length; i++) {
            // Check if the partner is found
            if (partners[i].partner == _partner) {
                hasPartner = true;
            }
        }
        require(hasPartner == true);

        // calculate the tokens according to value
        uint256 tokensValue = _value / 100;

        // Check if the partner has enough tokens
        require(balanceOf[_partner] >= tokensValue);

        // subtract the tokens from the partner
        balanceOf[_partner] -= tokensValue;

        // add the tokens to the sender
        balanceOf[msg.sender] += tokensValue;

        // Add the transaction to the transactions mapping
        transactions[msg.sender].push(
            Transaction(_partner, msg.sender, tokensValue)
        );
        transactions[_partner].push(
            Transaction(_partner, msg.sender, tokensValue)
        );

        // return true
        return true;
    }

    // This function will redeem the tokens
    // from the sender
    function redeem(uint256 _value) public returns (bool success) {
        // Check if the sender has enough tokens
        require(balanceOf[msg.sender] >= _value);

        // Subtract the tokens from the sender
        balanceOf[msg.sender] -= _value;

        // Subtract the tokens from the total supply
        totalSupply -= _value;

        // Add the transaction to the transactions mapping
        transactions[msg.sender].push(
            Transaction(msg.sender, address(0), _value)
        );

        // Emit the transfer event
        emit Transfer(msg.sender, address(0), _value);

        // Return true
        return true;
    }
}
