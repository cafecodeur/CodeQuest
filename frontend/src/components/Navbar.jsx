export default function Navbar({ wallet, connectWallet }) {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-white shadow mb-6">
      <h1 className="text-xl font-bold">DevQuest 🧠</h1>
      {wallet ? (
        <p className="text-sm font-mono text-gray-700">{wallet.slice(0, 6)}...{wallet.slice(-4)}</p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
}
