import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const A_PKEY = process.env.A_PKEY !== undefined ? process.env.A_PKEY : "";
const B_PKEY = process.env.B_PKEY !== undefined ? process.env.B_PKEY : "";
const POLYGONSCAN_KEY =
  process.env.POLYGONSCAN_KEY !== undefined ? process.env.POLYGONSCAN_KEY : "";
const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: "mumbai",
  mocha: {
    timeout: 10000000,
  },
  networks: {
    mumbai: {
      url: process.env.MUMBAI_PROVIDER || "",
      accounts: [A_PKEY, B_PKEY],
    },
    astar: {
      url: process.env.ASTAR_PROVIDER || "",
      accounts: [A_PKEY, B_PKEY],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_KEY,
    },
  },
};

export default config;
