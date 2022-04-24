const { ethers } = require("hardhat");
const {
  CRYPTOFRENCHIES_NFT_CONTRACT_ADDRESS,
} = require("../constants/constants");

async function main() {
  // Deploy the FakeNFTMarketplace contract first
  const FakeNFTMarketplace = await ethers.getContractFactory(
    "FakeNFTMarketplace"
  );
  const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
  await fakeNftMarketplace.deployed();

  console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

  // Now deploy the CryptoFrenchiesDAO contract
  const CryptoFrenchiesDAO = await ethers.getContractFactory(
    "CryptoFrenchiesDAO"
  );
  const cryptoFrenchiesDAO = await CryptoFrenchiesDAO.deploy(
    fakeNftMarketplace.address,
    CRYPTOFRENCHIES_NFT_CONTRACT_ADDRESS,
    {
      value: ethers.utils.parseEther("1"),
    }
  );
  await cryptoFrenchiesDAO.deployed();

  console.log("CryptoFrenchiesDAO deployed to: ", cryptoFrenchiesDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
