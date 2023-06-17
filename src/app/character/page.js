'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Character() {

  const [characterName, setCharacterName] = useState('');

  return (
    <main>
      <h1 className="flex justify-center m-5 text-4xl font-bold">Choose Your Own Adventure AI</h1>
      <div className="flex justify-center">
        <input
            className="flex justify-center align-bottom m-5 text-4xl font-bold border-2"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            type="text"
            placeholder="Bob The Builder"
        />
      </div>
      <Link
        href={{
          pathname: "/game",
          query: { name : characterName},
        }}
        className="flex justify-center"
      >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Game!</button>
      </Link>
    </main>
  )
}