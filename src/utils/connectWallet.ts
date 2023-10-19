import {ethers} from "ethers";

type ConnectWalletFunction = () => Promise<void>;

export const connectWallet: ConnectWalletFunction = async () => {

  try {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask not detected. Please install MetaMask.');
    }
    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    localStorage.setItem('wallet', account[0]);
  } catch (error) {
    console.log((error as Error).message)
  }
};