const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestGoogleDev", function () {
  it("Should mint and transfer to someone", async function () {
    const TestGoogleDev = await ethers.getContractFactory("TestGoogleDev");
    const testGoogleDev = await TestGoogleDev.deploy();
    await testGoogleDev.deployed();

    const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const metaDataUri = "cid1/test.png";

    const balance = await testGoogleDev.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await testGoogleDev.payToMint(
      recipient,
      metaDataUri,
      {
        value: ethers.utils.parseEther("0.05"),
      }
    );

    await newlyMintedToken.wait();
  });
});
