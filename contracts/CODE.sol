// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CODEToken is ERC20, Ownable {
    address public minter;

    constructor() ERC20("CODE", "CODE") {
        _transferOwnership(msg.sender);
    }

    function setMinter(address _minter) external onlyOwner {
        minter = _minter;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == minter, "Not authorized to mint");
        _mint(to, amount);
    }
}
