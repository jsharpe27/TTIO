"use client";

import { useState } from 'react';

export default function ProfileForm() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();


    try {
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username: username}),
      });
      if (response.ok) {
        const result = await response.json();
        setMessage(result.message);
      } else {
        setMessage('Error sending data to the API');
      }
    } catch (error) {
      setMessage('An error occurred while sending the request');
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center">
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
