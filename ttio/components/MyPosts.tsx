"use client"
import { useState, useEffect } from 'react';

export default function MyPosts() {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/get-posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const result = await response.json();
          
      
          console.log(result);


          setMessage(result.message);
        } else {
          setMessage('Error sending data to the API');
          console.log(message)
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
      <p>placeholder</p>
      
    </div>
  );
}