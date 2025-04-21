import { useState } from "react";

export default function SubmitQuestion({ wallet }) {
  const [text, setText] = useState("");
  const [type, setType] = useState("Simple");

  const submit = async () => {
    if (!wallet) {
      alert("Connect wallet first");
      return;
    }
    if (!text) {
      alert("Enter a question");
      return;
    }

    const rewardMap = { Simple: 10, Medium: 50, Hard: 100 };
    const body = {
      asker: wallet,
      text,
      type,
      reward: rewardMap[type],
      timestamp: Date.now(),
    };

    await fetch("http://localhost:3001/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setText("");
    alert("Question submitted");
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Ask a Question</h3>
      <textarea
        className="w-full border rounded p-2 mb-2"
        rows="3"
        placeholder="What do you want to ask?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="flex items-center gap-4">
        <select
          className="border rounded p-1"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Simple</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <button
          onClick={submit}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
