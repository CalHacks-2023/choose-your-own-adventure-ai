"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Adventure() {
  const [testing, setTesting] = useState(undefined);

  useEffect(() => {
    async function promptChat() {
      const data = await fetch("/api/game", {
        method: "POST",
        body: JSON.stringify({ testing: "testing" }),
      });
      const response = await data.json();
      console.log(response, "response");
      setTesting(response.data);
    }
    promptChat();
  }, []);

  useEffect(() => {
    console.log("testing", testing);
  }, [testing]);

  return (
    <main>
      <h1 className="flex justify-center m-5 text-4xl font-bold">Game Page</h1>
      <Link href="/" className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Home
        </button>
      </Link>
      {testing && (
        <p className="flex justify-center m-5 text-4xl font-bold">{testing}</p>
      )}
    </main>
  );
}
