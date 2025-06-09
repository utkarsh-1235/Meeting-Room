import React from 'react'
// import './App.css'
import LoginForm from './LoginForm'
import Dashboard from './Dashboard'
import Navigation from './Navigation'
import MeetingRoom from './MeetingRoom'
import ScheduleMeeting from './ScheduleMeeting'
import { useMeeting } from './Context/userContext'
// import {UserContextProvider} from './Context/userContext'

function App() {
  const { currentUser, currentView, activeMeeting } = useMeeting();

  if (!currentUser) {
    return <LoginForm />;
  }

  if (currentView === 'meeting' && activeMeeting) {
    return <MeetingRoom />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="px-6 py-8">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'schedule' && <ScheduleMeeting />}
      </main>
    </div>
  );
}

export default App

