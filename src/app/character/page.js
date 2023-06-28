'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from '../components/dropdown';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';

import 'react-toastify/dist/ReactToastify.css';

export default function Character() {
  const [characterName, setCharacterName] = useState('');
  const [biome, setBiome] = useState('Desert');
  const [difficulty, setDifficulty] = useState('Easy');
  const [disabledLink, setDisabledLink] = useState(true);
  const [gameType, setGameType] = useState('text');
  const [checked, setChecked] = useState(true);

  const notify = () =>
    toast.warn('Character Name Required', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });

  useEffect(() => {
    if (characterName === '') {
      setDisabledLink(true);
      return;
    }
    setDisabledLink(false);
  }, [characterName]);

  const handleChange = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (checked) {
      setGameType('game'); // changed from emotions
    } else {
      setGameType('game');
    }
  }, [checked]);

  return (
    <>
      <Header />
      <main className="flex justify-center bg-[url('/homePage.png')] items-center bg-cover h-screen w-screen">
        <div className="bg-gray-200 p-10 rounded-lg">
          <h1
            className="text-center mt-5 text-2xl font-bold"
            style={{ fontFamily: 'Cinzel Decorative' }}
          >
            Questify
          </h1>
          <div className="flex flex-col items-center mt-5">
            <label
              className="text-center font-bold"
              style={{ fontFamily: 'Cinzel Decorative' }}
            >
              Character Name:
            </label>
            <input
              className="border-2 mt-2 px-3 py-2 rounded"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              type="text"
              placeholder="Bob The Builder"
            />
          </div>
          <Dropdown
            title="Biome"
            options={['Desert', 'Forest', 'Mountains']}
            handleSelect={setBiome}
          />
          <Dropdown
            title="Difficulty"
            options={['Easy', 'Medium', 'Hard']}
            handleSelect={setDifficulty}
          />
          {/* <div className="flex flex-col items-center mt-5">
            <label
              htmlFor="toggle"
              className="flex items-center cursor-pointer"
            >
              <div className="ml-3 text-gray-700 font-medium pr-2">
                Text-Based{'  '}
              </div>
              <div className="relative">
                <input
                  id="toggle"
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={handleChange}
                />
                <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                <div
                  className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"
                  style={{
                    transform: checked ? 'translateX(100%)' : 'translateX(0)',
                  }}
                ></div>
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                Play with Emotions
              </div>
            </label>
          </div> */}
          <div className="flex justify-center mt-5">
            {disabledLink ? (
              <button
                className="bg-deep-forest-green hover:bg-moss-green text-white font-bold py-2 px-4 rounded"
                onClick={notify}
              >
                Start Game!
              </button>
            ) : (
              <Link
                href={{
                  pathname: '/game',
                  query: {
                    name: characterName,
                    biome: biome,
                    difficulty: difficulty,
                    gametype: gameType,
                  },
                }}
                className="flex justify-center"
              >
                <button className="bg-deep-forest-green hover:bg-moss-green text-white font-bold py-2 px-4 rounded">
                  Start Game!
                </button>
              </Link>
            )}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </div>
      </main>
    </>
  );
}
