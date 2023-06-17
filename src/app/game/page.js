import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1 className="flex justify-center m-5 text-4xl font-bold">Game Page</h1>
      <Link href="/" className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Home</button>
      </Link>
    </main>
  )
}