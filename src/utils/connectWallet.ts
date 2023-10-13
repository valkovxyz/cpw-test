type ConnectWalletFunction = () => Promise<void>;

export const connectWallet: ConnectWalletFunction = async () => {
  try {
    if (typeof window.ethereum === 'undefined') {
      throw new Error('MetaMask not detected. Please install MetaMask.');
    }

    if (window.ethereum.isConnected()) {
      localStorage.setItem('wallet', window.ethereum.selectedAddress);
    } else {
      localStorage.removeItem('wallet')
    }

    const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
    localStorage.setItem('wallet', account[0]);
  } catch (error) {
    console.error('Error connecting wallet:', (error as Error).message);
  }
};