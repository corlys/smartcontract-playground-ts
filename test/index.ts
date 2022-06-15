/* eslint-disable node/no-unsupported-features/es-builtins */
/* eslint-disable no-unused-expressions */
/* eslint-disable node/no-missing-import */
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";
import { CumCoin } from "../typechain/CumCoin";
import { CumCoin__factory as CumCoinFactory } from "../typechain/factories/CumCoin__factory";

describe("CumCoint Testing", () => {
  let cumCoinContract: CumCoin;
  beforeEach(async () => {
    console.log("Deploying Contract ... ");
    const [A] = await ethers.getSigners();
    const contractFactory = new CumCoinFactory(A);
    const deployTx = await contractFactory.deploy();
    cumCoinContract = await deployTx.deployed();
    console.log(`Contract Deployed to ${A.address}`);
  });

  it("A send 10 coins to B", async () => {
    const [A, B] = await ethers.getSigners();
    const beforeCoin = await cumCoinContract.balanceOf(A.address);
    const sendCoinTx = await cumCoinContract.transfer(
      B.address,
      BigNumber.from((10 * 10 ** 18).toString())
    );
    await sendCoinTx.wait();
    const afterCoin = await cumCoinContract.balanceOf(A.address);
    const sentCoint = await cumCoinContract.balanceOf(B.address);

    // const fiftyMilCoin = BigInt(`${50000000 * 10 ** 18}`);
    const tenCoin = BigInt(10 * 10 ** 18);

    // expect(beforeCoin.toString()).to.be.eq(fiftyMilCoin.toString());
    expect(afterCoin.lt(beforeCoin)).to.be.eq(true);
    expect(sentCoint.toString()).to.be.eq(tenCoin.toString());
  });

  it("We try to listen some events", async () => {
    // eslint-disable-next-line no-unused-vars
    const [A, B] = await ethers.getSigners();
    const sendCoinTx = await cumCoinContract.transfer(
      B.address,
      BigNumber.from((10 * 10 ** 18).toString())
    );
    // await sendCoinTx.wait();
    const receipt = await sendCoinTx.wait();
    const filter = cumCoinContract.filters.Transfer();
    const events = await cumCoinContract.queryFilter(
      filter,
      receipt.blockNumber
    );
    const from = events[0].args.from;
    const to = events[0].args.to;
    const value = events[0].args.value;
    console.log(`from : ${from}`);
    console.log(`to : ${to}`);
    console.log(`value : ${value}`);
    expect(value.toString()).to.be.eq(
      BigNumber.from((10 * 10 ** 18).toString())
    );
  });
});
