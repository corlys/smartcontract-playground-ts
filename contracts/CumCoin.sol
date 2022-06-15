// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CumCoin is ERC20 {
    constructor() ERC20("CumCoin", "CUM") {
        _mint(msg.sender, 50000000 * 10 ** decimals());
    }
}