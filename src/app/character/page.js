'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from '../components/dropdown';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export default function Character() {

  const [characterName, setCharacterName] = useState('');
  const [biome, setBiome] = useState('Desert');
  const [difficulty, setDifficulty] = useState('Easy');
  const [disabledLink, setDisabledLink] = useState(true);

  const notify = () => toast.warn('Character Name Required', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

    useEffect(() => {
      if (characterName === '') {
        setDisabledLink(true);
        return;
      }
      setDisabledLink(false);
    }, [characterName])

  return (
    <main>
      <h1 className="text-center mt-5 text-2xl font-bold">Choose Your Own Adventure AI</h1>
      <div className="flex flex-col items-center mt-5">
        <label className="text-center font-bold">Character Name:</label>
        <input
          className="border-2 mt-2 px-3 py-2 rounded"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          type="text"
          placeholder="Bob The Builder"
        />
      </div>
      <Dropdown title="Biome" options={['Desert', 'Forest', 'Mountains']} handleSelect={setBiome} />
      <Dropdown title="Difficulty" options={['Easy', 'Medium', 'Hard']} handleSelect={setDifficulty} />
      <div className="flex justify-center mt-5">
        {disabledLink ? (
          <button
            className="bg-deep-forest-green hover:bg-moss-green text-white font-bold py-2 px-4 rounded"
            onClick={notify}
          >
            Start Game!
          </button>
        ) :
        (
          <Link
            href={{ pathname: "/game", query: { name: characterName, biome: biome, difficulty: difficulty } }}
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
    </main>

  )
}