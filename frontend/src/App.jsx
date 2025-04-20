import { useEffect, useState } from 'react';

export default function App() {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        }
      }
    };
    checkWallet();
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setWallet(accounts[0]);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">DevQuest 🧠</h1>
      {wallet ? (
        <p className="mb-4">Connected as: <span className="font-mono">{wallet}</span></p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
}
