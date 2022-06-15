/* eslint-disable node/no-missing-import */
import { ethers } from "hardhat";

async function main() {
  const ABI = [
    "event TestEvent(address sender, uint256 counter, uint256 timestamp)",
  ];

  const log = {
    topics: [
      "0x42457f7c0db69ab2a84bb57d48fd80806aedb8b1d08516f651826024987e0b9c",
    ],
    data: "0x00000000000000000000000096355f34d24a5e345f75fffb87b661b65542e91b00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000062a9bb44",
  };

  const iface = new ethers.utils.Interface(ABI);
  const events = iface.parseLog(log);
  console.log(events.args);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
