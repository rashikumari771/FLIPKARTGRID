// contracts/Transaction.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract Transaction {
    struct transaction {
        address sender;
        address receiver;
        uint256 value;
    }
}
