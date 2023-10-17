"use client"
import { useState, useEffect } from 'react';

export default function MyPosts() {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch('/api/get-posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
        if (response.ok) {
          const result = await response.json();
          if(result.success == true) {
            setPosts(result.data[0].title)
            console.log(posts)
          }
          console.log(result, 'we are here');
          setPosts(result.data[0].title);

        } else {
          setMessage('Error sending data to the API');
        } 
      } catch (error) {
        setMessage('An error occurred while sending the request');
        console.log(message)
      }
    }
    fetchPosts();
  }, []); 


  async function handleNewPost(e: any) {
    e.preventDefault();
    try {
      const response = await fetch('api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title: title, body: body}),
    })
        if (response.ok) {
          const result = await response.json();
          setMessage(result.message);
        } else {
          setMessage('Error sending data to the API');
        }
      } catch (error) {
        setMessage('An error occurred while sending the request');
      }

  }



  return (
    <div>
      <div className="bg-white text-black mb-20">
        <h1>My Posts</h1>
        {posts}
      </div>


      <form className='flex flex-col'
      onSubmit={handleNewPost}
      >
        <h2>Add a new post</h2>
        <input 
        type="text" 
        placeholder="title" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
        placeholder="body" 
        value={body}
        onChange={(e) => setBody(e.target.value)}
        />
        <button>Add Post</button>
      </form>

    
    </div>
  );
}
