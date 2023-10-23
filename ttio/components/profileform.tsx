"use client";

import { useState } from 'react';

export default function ProfileForm() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();


    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username}),
      });
      if (response.ok) {
        const result = await response.json();
        if(result.success == false) {
          if(result.error.code == '23514') {
          } 
          switch (result.error.code) {
            case '23514':
              setMessage('Username should have at least 3 lettres');
              break;
            case '23505':
            setMessage('Username already used!');
              break;
            default:
              setMessage('Error with this username');
          }
        } else {
          setMessage("Profile updated successfully");
        }
      } else {
        setMessage('Error sending data to the API');
      }
    } catch (error) {
      setMessage('An error occurred while sending the request');
    }

  };

  return (
    <div className="min-h-1/2 flex items-center 
    p-5 justify-center border-black border mt-11">
      <div className="max-w-md">
        <h1 className="text-2xl font-semibold mb-4">Submit Username</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-black px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Submit
          </button>
        </form>
        {message && (
          <div className="mt-4 text-green-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
