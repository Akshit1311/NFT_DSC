import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const WalletBalance = () => {
  const [walletBalance, setWalletBalance] = useState(0);

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    //Initialize Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    //Get Current Balance
    const balance = await provider.getBalance(account);

    setWalletBalance(ethers.utils.formatEther(balance));
  };

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div>
      <h3>Wallet Balance: {walletBalance} </h3>
    </div>
  );
};

export default WalletBalance;
