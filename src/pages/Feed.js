import React from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const Feed = () => {
  const navigate = useNavigate()
  const logout = async () => {
    await signOut(auth);
    navigate('/login');
  }

  return (
    <>
      <h1>Hello World</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Feed
