pragma solidity ^0.8.4;

contract EventContract {
    event TestEvent(address sender, uint256 counter, uint256 timestamp);
    uint256 counter;

    constructor() {}

    function execEvent() external {
        counter++;
        emit TestEvent(msg.sender, counter, block.timestamp);
    }
}
