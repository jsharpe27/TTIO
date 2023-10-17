"use client"
import { useState, useEffect } from 'react';

export default function MyPosts() {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/posts', {
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


        } else {
          setMessage('Error sending data to the API');
        } 
      } catch (error) {
        setMessage('An error occurred while sending the request');
        console.log(message)
      }
    }
    fetchData();
  }, []); 


  return (
    <div className="bg-white text-black mb-20">
       {posts.map((post: any) => (
          <li key={post.id}>{post.title}</li>
        ))}
      
    </div>
  );
}