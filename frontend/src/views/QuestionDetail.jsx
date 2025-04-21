import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function QuestionDetail() {
  const { id } = useParams();
  const [wallet, setWallet] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(\`http://localhost:3001/questions/\${id}\`);
      const data = await res.json();
      setQuestion(data.question);
      setAnswers(data.answers);
    };

    const checkWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        }
      }
    };

    fetchData();
    checkWallet();
  }, [id]);

  const postAnswer = async () => {
    if (!newAnswer || !wallet) return alert("Missing answer or wallet");
    const body = {
      question_id: parseInt(id),
      responder: wallet,
      text: newAnswer,
      timestamp: Date.now()
    };

    await fetch("http://localhost:3001/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    setNewAnswer("");
    const res = await fetch(\`http://localhost:3001/questions/\${id}\`);
    const data = await res.json();
    setAnswers(data.answers);
  };

  const acceptAnswer = async (answerId) => {
    if (!wallet || question.asker.toLowerCase() !== wallet.toLowerCase()) {
      return alert("Only the asker can accept an answer.");
    }

    await fetch(\`http://localhost:3001/answers/accept\`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question_id: parseInt(id), answer_id: answerId })
    });

    const res = await fetch(\`http://localhost:3001/questions/\${id}\`);
    const data = await res.json();
    setAnswers(data.answers);
  };

  return (
    <div>
      {question && (
        <>
          <h2 className="text-xl font-bold mb-2">{question.text}</h2>
          <p className="text-sm text-gray-600 mb-6">Type: {question.type} | Asked by {question.asker}</p>

          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Answers</h3>
            {answers.length === 0 && <p>No answers yet.</p>}
            {answers.map((a) => (
              <div
                key={a.id}
                className="border p-2 rounded mb-2 flex justify-between items-center"
              >
                <div>
                  <p>{a.text}</p>
                  <p className="text-xs text-gray-500">by {a.responder}</p>
                </div>
                <div>
                  {a.accepted ? (
                    <span className="text-green-600 font-bold">Accepted</span>
                  ) : wallet === question.asker ? (
                    <button
                      onClick={() => acceptAnswer(a.id)}
                      className="text-sm bg-indigo-600 text-white px-2 py-1 rounded"
                    >
                      Accept
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Your Answer</h3>
            <textarea
              className="w-full border rounded p-2 mb-2"
              rows="3"
              placeholder="Write your answer..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <button
              onClick={postAnswer}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
            >
              Submit Answer
            </button>
          </div>
        </>
      )}
    </div>
  );
}
