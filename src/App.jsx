import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import MeetingApp from './MeetingApp'
import LoginForm from './LoginForm'
import Dashboard from './Dashboard'
import ScheduleMeeting from './ScheduleMeeting'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <LoginForm /> */}
    {/* <MeetingApp/> */}
    {/* <Dashboard/> */}
    <ScheduleMeeting/>
    </>
  )
}

export default App
