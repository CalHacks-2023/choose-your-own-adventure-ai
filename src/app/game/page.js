'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSearchParams } from "next/navigation";

export default function Home() {

  const searchParams = useSearchParams();
  const [mostRecentChat, setMostRecentChat] = useState(undefined);
  const [userInput, setUserInput ] = useState('');
  const [messageHistory, setMessageHistory] = useState([{"role": "system", "content": "You are a choose your adventure game"}, {"role": "user", "content": "Set the scene for and intro to a choose your own adventure game."}])
  const [characterName, setCharacterName] = useState(searchParams.get("name"));

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessageHistory([...messageHistory, {"role" : "system", "content" : mostRecentChat }, {"role": "user", "content": userInput}])
  }

  useEffect(() => {
    promptChat();
  }, [messageHistory])

  useEffect(() => {
    promptChat();
  }, [])

  async function promptChat() {
    const data = await fetch('/api/game', {
      method: 'POST',
      body: JSON.stringify({ messageHistory: messageHistory })
    })
    const response = await data.json()
    setMostRecentChat(response.data)
  }

  return (
    <main>
      <h1 className="flex justify-center m-5 text-4xl font-bold">Game Page</h1>
      {messageHistory.slice(1 , messageHistory.length).map((message, index) => {
        return (
          <div key={index} className="flex justify-center m-5 text-sm font-bold">
            {message.role === 'system' ? '' : 'You: '}
            {message.content}
          </div>
        )
      })}
      {mostRecentChat && <p className="flex justify-center m-5 text-sm font-bold">{mostRecentChat}</p>}
      <label>Do: </label>
      <form onSubmit={submitHandler}>
        <input
          className="flex justify-center align-bottom m-5 text-4xl font-bold border-2"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          type="text"
          placeholder="Whack Goblin"
        />
        <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">Submit</button>
      </form>
      <Link href="/" className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</button>
      </Link>
    </main>
  )
}