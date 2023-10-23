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
        const response = await fetch('/api/posts/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          
        });
        if (response.ok) {
          const result = await response.json();
          if(result.success == true) {
            setPosts(result.data)
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
      const response = await fetch('api/get-posts', {
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
    <div className="bg-white text-black mb-20">
       {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      
    </div>
  );
}
