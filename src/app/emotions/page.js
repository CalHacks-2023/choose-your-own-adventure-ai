'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/header';

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
  const [biome, setBiome] = useState(searchParams.get('biome'));
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty'));
  const [chatLoading, setChatLoading] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    setUserInput('');
    setChatLoading(true);
    setMessageHistory([
      ...messageHistory,
      { role: 'system', content: mostRecentChat },
      { role: 'user', content: userInput },
    ]);
  };

  const scrollableDivRef = useRef(null);

  const configureBackground = () => {
    //bg-[url('/homePage.png')]
    if (biome === 'Mountains') {
      return "url('/Mountains.png')";
    } else if (biome === 'Desert') {
      return "url('/Desert.png')";
    } else {
      return "url('/homePage.png')";
    }
  };

  useEffect(() => {
    scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
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
    setChatLoading(false);
  }

  const sendInitialData = async () => {
    console.log('sendInitialData')
    const data = await fetch('/api/emotions', {
      method: 'POST',
      body: JSON.stringify({
        name: characterName,
        biome: biome,
        difficulty: difficulty
      }),
    });
    console.log('data', data)
  };

  const getInitialRespose = async () => {
    console.log('getInitialRespose')
    const data = await fetch('/api/emotions', {
      method: 'GET',
    });
    console.log('data', data)
  };

  const inputExpressions = async () => {
    console.log('inputExpressions')
    const data = await fetch('/api/expression', {
      method: 'GET',
    });
    console.log('data', data)
  };


  return (
    <main
      className={`${
        biome === 'Desert'
          ? "bg-[url('/Desert.png')]"
          : biome === 'Mountains'
          ? "bg-[url('/Mountains.png')]"
          : "bg-[url('/homePage.png')]"
      } bg-cover bg-center items-center h-screen w-screen`}
    >
      <Header />
      <div className="flex justify-center">
        <div
          className="m-5 p-2 bg-slate-100 bg-opacity-80 border border-gray-300 rounded-md h-[70vh] overflow-y-scroll sm:w-3/4 sm:flex md:w-2/3 md:flex-col"
          ref={scrollableDivRef}
        >
          {messageHistory
            .slice(1, messageHistory.length)
            .map((message, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-center m-5 sm:text-sm md:text-lg font-bold"
                >
                  {message.role === 'system' ? '' : characterName + ': '}
                  {message.content}
                </div>
              );
            })}
            <h1 className="text-4xl font-bold text-center">Emotions PAGE</h1>
          {mostRecentChat && !chatLoading && (
            <p className="flex justify-center m-5 sm:text-sm md:text-lg font-bold">
              {mostRecentChat}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        {chatLoading ? (
          <div
            className="animate-spin w-8 h-8 border-[3px] border-current border-t-transparent text-slate-100 rounded-full"
            role="status"
            aria-label="loading"
          />
        ) : (
          <div className="w-8 h-8" />
        )}
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-deep-forest-green hover:bg-moss-green text-white text-sm font-bold rounded h-1/3 p-2"
          onClick={sendInitialData}
          // disabled={chatLoading}
        >
          Initial Request
        </button>
        <button
          className="bg-deep-forest-green m-3 hover:bg-moss-green text-white text-sm font-bold rounded h-1/3 p-2"
          onClick={getInitialRespose}
          // disabled={chatLoading}
        >
          First Input
        </button>
        <button
          className="bg-deep-forest-green hover:bg-moss-green text-white text-sm font-bold rounded h-1/3 p-2"
          onClick={inputExpressions}
          // disabled={chatLoading}
        >
          Get New FACE EMOTION
        </button>
      </div>
      {/* <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div className="bg-blue-600 text-xs font-medium  text-blue-100 text-center p-0.5 leading-none rounded-full"> 45%</div>
      </div> */}
    </main>
  );
}
