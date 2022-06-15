/* eslint-disable node/no-missing-import */
import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import { EventContract__factory as EventContractFactory } from "../typechain/factories/EventContract__factory";

async function main() {
  // const [owner] = await ethers.getSigners();
  const WebSocketProvider = new ethers.providers.WebSocketProvider(
    "wss://astar.blastapi.io/b47d84b0-7653-4de0-83ab-b71dbefe61f7",
    { chainId: 592, name: "astar" }
    // "astar"
  );
  const eventContract = EventContractFactory.connect(
    "0x49C51117bebd57815E79e6e6f6B343e51C8151EE",
    WebSocketProvider
  );
  const filter = eventContract.filters.TestEvent(null, BigNumber.from(3));
  eventContract.on(filter, (e1, e2, e3) => {
    console.log("ZAPP");
    console.log(e1, e2, e3);
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
