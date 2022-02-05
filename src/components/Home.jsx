import React, { useEffect, useState } from "react";
import WalletBalance from "./WalletBalance";

import TestGoogleDev from "../artifacts/contracts/TestGoogleDev.sol/TestGoogleDev.json";
import { ethers } from "ethers";

const contractAddr = process.env.REACT_APP_CONTRACT_ADDRESS;

const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const contract = new ethers.Contract(contractAddr, TestGoogleDev.abi, signer);

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);

  const getTotalMinted = async () => {
    const _totalMinted = await contract.totalMinted();
    console.log({ _totalMinted: parseInt(_totalMinted) });
    setTotalMinted(parseInt(_totalMinted));
  };

  useEffect(() => {
    getTotalMinted();
  }, []);

  return (
    <div>
      Home
      <WalletBalance />
      <div className="grid">
        {Array(totalMinted)
          .fill(0)
          .map((_, i) => (
            <NFTImage key={i} tokenId={i + 1} />
          ))}
      </div>
    </div>
  );
};

export default Home;

const NFTImage = ({ tokenId }) => {
  const [isMinted, setIsMinted] = useState(false);

  const ipfsHash = "QmUnGPBNd9b5yx9X9SruuTEcJdvck8Don32Daoe88wHydy";
  const metadataURI = `${ipfsHash}/${tokenId}.json`;
  const imgUrl = `https://gateway.pinata.cloud/ipfs/QmWXgvZuZWfMCvAhSm7ixS2gprZXNkkrf1uoBm2bGJPd92/${tokenId}.png`;

  const getMintStatus = async () => {
    const _isMinted = await contract.isContentOwned(metadataURI);
    setIsMinted(_isMinted);
  };

  const mintNow = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.payToMint(addr, metadataURI, {
      value: ethers.utils.parseEther("0.05"),
    });

    await result.wait();
  };

  useEffect(() => {
    getMintStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log({ tokenId, isMinted });
  }, [isMinted, tokenId]);

  if (isMinted)
    return (
      <div className="box">
        <img src={imgUrl} alt={tokenId} />
      </div>
    );
  else
    return (
      <div className="container">
        <div className="box">?</div>
        <button onClick={mintNow}>Mint Now</button>
      </div>
    );
};
