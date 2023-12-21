const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const LoyaltyProgram = await ethers.getContractFactory("LoyaltyProgram");
  console.log("Deploying Loayalty Program with COSMOS Token...");
  const loyaltyProgram = await LoyaltyProgram.deploy(100000000,"COSMOS","CMOS");
  await loyaltyProgram.deployed();
  console.log(" Loayalty Program with COSMOS Token deployed to:", loyaltyProgram.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
