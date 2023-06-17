import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1 className="flex justify-center m-5 text-4xl font-bold">Choose Your Own Adventure AI</h1>
      <Link href="/game" className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start Game</button>
      </Link>
    </main>
  )
}
