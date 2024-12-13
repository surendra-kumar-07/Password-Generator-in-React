import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';


export default function Home() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);
  const copyCharinputRef = useRef(null);

  const passGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllow) str += '0123456789';
    if (charAllow) str += '!@#$%&^()';

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllow, charAllow]);

  const copyPassToClip = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passGenerator();
  }, [length, numberAllow, charAllow, passGenerator]);

  return (
    <>
    <Head>
        <title>
         Password Generator
        </title>
      </Head>
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#4f8ef7] to-[#66b3ff] px-2">
      <div className="bg-[#f0f0f0] rounded-lg shadow-xl p-2 md:p-10 w-full max-w-2xl">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Password Generator</h1>

        {/* Password Display Section */}
        <div className="flex items-center space-x-4 mb-4">
          <input
            ref={passwordRef}
            type="text"
            value={password}
            readOnly
            className="w-full p-4 rounded-lg bg-white text-gray-800 text-xl font-mono outline-none shadow-md"
          />
          <button
            onClick={copyPassToClip}
            className="bg-[#1D72B8] text-white py-2 px-6 rounded-lg hover:bg-[#0d57a1] transition duration-200"
          >
            Copy
          </button>
        </div>

        {/* Options Section */}
        <div className="flex justify-between items-center space-x-4 mb-6 flex-wrap gap-4">
          <div className="flex items-center">
            <input
              id="length"
              type="range"
              onChange={(e) => setLength(Number(e.target.value))}
              value={length}
              min={6}
              max={30}
              className="w-32"
            />
            <span className="ml-2 text-gray-700">Length ({length})</span>
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="Numbers" className="text-gray-700">Numbers</label>
            <input
              id="Numbers"
              type="checkbox"
              checked={numberAllow}
              onChange={() => setNumberAllow((prev) => !prev)}
              className="form-checkbox text-[#1D72B8]"
            />
          </div>

          <div className="flex items-center space-x-2">
            <label htmlFor="Characters" className="text-gray-700">Special Characters</label>
            <input
              id="Characters"
              type="checkbox"
              checked={charAllow}
              onChange={() => setCharAllow((prev) => !prev)}
              className="form-checkbox text-[#1D72B8]"
            />
          </div>
        </div>

      </div>
    </div>
    </>
  );
}
