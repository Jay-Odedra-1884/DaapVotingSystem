// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {VotingSystem} from "../src/VotingSystem.sol";

contract CounterTest is Test {
    VotingSystem public votingSystem;

    function setUp() public {
        votingSystem = new Counter();
        votingSystem.setNumber(0);
    }
}
