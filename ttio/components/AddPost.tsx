"use client"

import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(`${supabaseUrl}`, `${supabaseAnonKey}`);



export default function AddPost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const user = supabase.auth.getUser()

  function addPost() {
    console.log(user)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addPost();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}  />
      <input type="text" placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)}  />
      <button type="submit"
      className='text-white'
      >Add</button>
    </form>
  );
}