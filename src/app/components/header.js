'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="bg-deep-forest-green text-white -py-2 flex items-center justify-between">
      <>
        <Link href="/">
          <button className="mx-4 my-2 focus:outline-none">
            <Image
              height={50}
              width={50}
              src="/Logo.png"
              alt="Adventure Game Logo"
            />
          </button>
        </Link>
      </>
      <>
        <button
          className="text-white mx-4 font-medium hover:underline focus:outline-none"
          onClick={handleMenuToggle}
        >
          Menu
        </button>
        {isMenuOpen && (
          <ul className="absolute top-12 right-0 bg-moss-green text-white rounded-md shadow-md py-2 px-4">
            <li>
              <Link href="/login">
                <button className="block py-1 hover:underline">Login</button>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <button className="block py-1 hover:underline">Signup</button>
              </Link>
            </li>
            <li>
              <Link href="/character">
                <button className="block py-1 hover:underline">
                  Character Creation
                </button>
              </Link>
            </li>
          </ul>
        )}
      </>
    </div>
  );
}
