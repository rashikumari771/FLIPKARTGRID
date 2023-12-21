const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const flipCoinFactory = await ethers.getContractFactory("FlipCoin");
  console.log("Deploying FlipCoin...");
  const flipCoin = await flipCoinFactory.deploy(10000);
  await flipCoin.deployed();
  console.log("FlipCoin deployed to:", flipCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
