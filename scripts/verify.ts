/* eslint-disable node/no-missing-import */
import { run } from "hardhat";

async function main() {
  await run("verify:verify", {
    address: "0x5b4e4e008ca9ee7e60e463ad54dda8971f12a79e",
    contract: "contracts/CumCoin.sol:CumCoin",
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
