'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Adventure() {
  const searchParams = useSearchParams();
  const [mostRecentChat, setMostRecentChat] = useState(undefined);
  const [userInput, setUserInput] = useState('');
  const [messageHistory, setMessageHistory] = useState([
    { role: 'system', content: 'You are a choose your adventure game' },
    {
      role: 'user',
      content:
        'Set the scene for and intro to a choose your own adventure game.',
    },
  ]);
  const [characterName, setCharacterName] = useState(searchParams.get('name'));

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessageHistory([
      ...messageHistory,
      { role: 'system', content: mostRecentChat },
      { role: 'user', content: userInput },
    ]);
  };

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
    console.log('Inside useEffect');
  }, [mostRecentChat]);

  useEffect(() => {
    promptChat();
  }, [messageHistory]);

  useEffect(() => {
    promptChat();
  }, []);

  async function promptChat() {
    const data = await fetch('/api/game', {
      method: 'POST',
      body: JSON.stringify({ messageHistory: messageHistory }),
    });
    const response = await data.json();
    setMostRecentChat(response.data);
  }

  return (
    <main>
      <div className="flex justify-center">
        <div
          className="flex flex-col m-5 p-2 border border-gray-300 rounded-md h-[60vh] w-2/3 overflow-scroll"
          ref={scrollableDivRef}
        >
          {messageHistory
            .slice(1, messageHistory.length)
            .map((message, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center m-5 text-sm font-bold"
                >
                  {message.role === 'system' ? '' : 'You: '}
                  {message.content}
                </div>
              );
            })}
          {mostRecentChat && (
            <p className="flex justify-center m-5 text-sm font-bold">
              {mostRecentChat}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <form className="flex w-1/2 items-center" onSubmit={submitHandler}>
          <input
            className="flex justify-center align-bottom m-5 text-4xl font-bold border-2 w-2/3"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            type="text"
            style={{ width: '60vw' }}
            placeholder="Whack Goblin"
          />
          <button
            className="bg-deep-forest-green hover:bg-moss-green text-white font-bold rounded h-1/2 p-2"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
