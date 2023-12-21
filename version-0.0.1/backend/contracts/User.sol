// contracts/User.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract User {
    struct user {
        string name;
        uint256 utype;
        address userAddress;
        string about;
        string twitterHandle;
        string facebookHandle;
    }
}
