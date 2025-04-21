import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubmitQuestion from "../components/SubmitQuestion";

export default function Home() {
  const [questions, setQuestions] = useState([]);
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch("http://localhost:3001/questions");
      const data = await res.json();
      setQuestions(data);
    };

    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        }
      }
    };

    fetchQuestions();
    checkWallet();
  }, []);

  return (
    <div>
      <SubmitQuestion wallet={wallet} />
      <h2 className="text-2xl font-semibold mb-4">Recent Questions</h2>
      {questions.map((q) => (
        <Link key={q.id} to={`/question/${q.id}`}>
          <div className="border p-3 mb-2 rounded hover:bg-gray-50 cursor-pointer">
            <p className="font-medium">{q.text}</p>
            <p className="text-sm text-gray-500">Type: {q.type} | Asked by {q.asker.slice(0, 6)}...</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
