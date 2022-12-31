// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Counter{
    uint num;
    address owner;
    constructor (){
        num = 0;
        // msg.sender the people who deploy this contract
        owner = msg.sender;
    }
    function increment() public{
        if (owner == msg.sender){
            num += 1;
        }
    }

    function getNum()public view returns (uint){
        return num;
    }
}