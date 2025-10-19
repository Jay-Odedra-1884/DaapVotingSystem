// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {VotingSystem} from "../src/VotingSystem.sol";

contract CounterScript is Script {
    VotingSystem public votingSystem;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        votingSystem = new Counter();

        vm.stopBroadcast();
    }
}
