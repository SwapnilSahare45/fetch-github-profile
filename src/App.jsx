import React from 'react'
import Profile from './components/Profile'
import { ProfileProvider } from './context/ProfileContext'

const App = () => {
  return (
    <div>
      <ProfileProvider>
        <Profile />
      </ProfileProvider>
    </div>
  )
}

export default App