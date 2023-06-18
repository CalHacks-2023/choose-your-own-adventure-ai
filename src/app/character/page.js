'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Dropdown from '../components/dropdown';

export default function Character() {

  const [characterName, setCharacterName] = useState('');
  const [biome, setBiome] = useState('Desert');
  const [difficulty, setDifficulty] = useState('Easy');

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
        <Link
          href={{ pathname: "/game", query: { name: characterName, biome: biome, difficulty: difficulty } }}
          className="flex justify-center"
        >
          <button className="bg-deep-forest-green hover:bg-moss-green text-white font-bold py-2 px-4 rounded">
            Start Game!
          </button>
        </Link>
      </div>
    </main>

  )
}