"use client";

import { useState } from "react";
import { ethers } from "ethers";

export default function Transaction() {
  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const handleSend = async () => {
    if (!walletAddress || !amount) {
      alert("Please enter a valid wallet address and amount.");
      return;
    }

    try {
      // Connect to MetaMask
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Send transaction
        const tx = await signer.sendTransaction({
          to: walletAddress,
          value: ethers.utils.parseEther(amount),
        });

        setTransactionHash(tx.hash);
        alert("Transaction sent! Hash: " + tx.hash);
      } else {
        alert("MetaMask is not installed!");
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-5">Send ETH</h1>
      <input
        type="text"
        placeholder="Wallet Address"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
        className="border border-gray-300 p-2 mb-3"
      />
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-gray-300 p-2 mb-3"
      />
      <button
        onClick={handleSend}
        className="border border-black rounded-md px-3 py-1"
      >
        Send ETH
      </button>
      {transactionHash && (
        <p className="mt-3">Transaction Hash: {transactionHash}</p>
      )}
    </div>
  );
}