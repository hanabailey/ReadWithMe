'use client'

import React from 'react'
import Image from 'next/image'
import { useState } from 'react';
import './Login.css'


function LogIn() {
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const login=()=>{
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    window.location.href='http://localhost:2000/home'

  }
  
  return (
    <>
    <Image className="icon" src="/images/Vector.png" alt="My Image" width={100} height={100} />
    <div className='loginFrame'>
      <h1>Log In</h1>
      <div className='form-group'>
        <input type="text" placeholder='ID' value={username} onChange ={(e)=>{setUsername(e.target.value)}} />
        <input type="password" placeholder='Password' value={password}onChange ={(e)=>{setPassword(e.target.value)}}/>
        <button className='loginButton' onClick={login}>LOG IN</button>
      </div>
      
    </div>
    
    </>
  )
}

export default LogIn