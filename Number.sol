pragma solidity ^0.8.7;

contract Number {
    uint256 public number;

    constructor(uint256 initNum) {
        number = initNum;
    }

    function add(uint256 x) public {
        require(x > 0, "add value must be positive");
        number = number + x;
    }

    function minus(uint256 x) public {
        require(x > 0, "minus value must be positive");
        number = number - x;
    }

    function set(uint256 x) public {
        number = x;
    }

    function get() public view returns (uint256) {
        return number;
    }
}