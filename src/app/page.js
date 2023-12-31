import Link from 'next/link';
import styles from './styles/Home.module.css';

export default function Home() {
  return (
    <main className="flex justify-center bg-[url('/homePage.png')] bg-cover bg-center items-center h-screen w-screen">
      <div className="bg-gray-200 p-10 rounded-lg">
        <h1
          className="text-4xl font-bold text-center"
          style={{ fontFamily: 'Cinzel Decorative' }}
        >
          Questify
        </h1>
        <p
          className="text-l text-center"
          style={{ fontFamily: 'Cinzel Decorative' }}
        >
          Choose your own Adventure
        </p>
        <div className="flex flex-col items-center">
          <Link href="/character">
            <button className="bg-deep-forest-green hover:bg-moss-green text-white font-bold py-2 px-4 rounded my-1">
              Play Now!
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-deep-forest-green hover:bg-moss-green text-white font-bold py-2 px-4 rounded my-1">
              Log in
            </button>
          </Link>
          <Link href="/signup">
            <button className="text-center my-1">Sign up</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
