"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Adventure() {
  const searchParams = useSearchParams();
  const [mostRecentChat, setMostRecentChat] = useState(undefined);
  const [userInput, setUserInput] = useState("");
  const [messageHistory, setMessageHistory] = useState([
    { role: "system", content: "You are a choose your adventure game" },
    {
      role: "user",
      content:
        "Set the scene for and intro to a choose your own adventure game.",
    },
  ]);
  const [characterName, setCharacterName] = useState(searchParams.get("name"));
  const [chatLoading, setChatLoading] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUserInput('');
    setChatLoading(true);
    setMessageHistory([
      ...messageHistory,
      { role: "system", content: mostRecentChat },
      { role: "user", content: userInput },
    ]);
  };

  useEffect(() => {
    promptChat();
  }, [messageHistory]);

  useEffect(() => {
    promptChat();
  }, []);

  async function promptChat() {
    const data = await fetch("/api/game", {
      method: "POST",
      body: JSON.stringify({ messageHistory: messageHistory }),
    });
    const response = await data.json();
    setMostRecentChat(response.data);
    setChatLoading(false);
  }

  return (
    <main>
      <div className="flex justify-center">
        <div className="flex flex-col m-5 p-2 border border-gray-300 rounded-md h-[60vh] w-2/3 overflow-scroll">
          {messageHistory
            .slice(1, messageHistory.length)
            .map((message, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center m-5 text-sm font-bold"
                >
                  {message.role === "system" ? "" : "You: "}
                  {message.content}
                </div>
              );
            })}
          {mostRecentChat && !chatLoading && (
            <p className="flex justify-center m-5 text-sm font-bold">
              {mostRecentChat}
            </p>
          )}
        </div>
      </div>
      <label>Do: </label>
      <form onSubmit={submitHandler}>
        <input
          className="flex justify-center align-bottom m-5 text-4xl font-bold border-2"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          placeholder="Whack Goblin"
          disabled={chatLoading}
        />
        { chatLoading ? <div className="animate-spin w-12 h-12 border-[3px] border-current border-t-transparent text-deep-forest-green rounded-full" role="status" aria-label="loading" /> : null }
        <button
          className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
}
