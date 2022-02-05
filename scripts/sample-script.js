const hre = require("hardhat");

async function main() {
  const TestGoogleDev = await hre.ethers.getContractFactory("TestGoogleDev");
  const testGoogleDev = await TestGoogleDev.deploy();

  await testGoogleDev.deployed();

  console.log("TestGoogleDev deployed to:", testGoogleDev.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
