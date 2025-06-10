// import React, { useState, createContext, useContext } from 'react';

// // Context for global state management
// const MeetingContext = createContext();

// // Custom hook to use meeting context
// export const useMeeting = () => {
//   const context = useContext(MeetingContext);
//   if (!context) {
//     throw new Error('useMeeting must be used within a MeetingProvider');
//   }
//   return context;
// };

// // Context Provider Component
// export const MeetingProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);          
//   const [currentView, setCurrentView] = useState('login');
//   const [meetings, setMeetings] = useState([]);
//   const [activeMeeting, setActiveMeeting] = useState(null);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isCameraOff, setIsCameraOff] = useState(false);
//   const [isScreenSharing, setIsScreenSharing] = useState(false);
  
//   const [users] = useState([
//     { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' },
//     { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password' },
//     { id: 3, name: 'Mike Johnson', email: 'mike@example.com', password: 'password' }
//   ]);

//   const login = (email, password) => {
//     const user = users.find(u => u.email === email && u.password === password);
//     if (user) {
//       setCurrentUser(user);
//       setCurrentView('dashboard');
//       return { success: true };
//     }
//     return { success: false, error: 'Invalid credentials' };
//   };

//   const logout = () => {
//     setCurrentUser(null);
//     setCurrentView('login');
//     setActiveMeeting(null);
//   };

//   const scheduleMeeting = (meetingData) => {
//     const newMeeting = {
//       id: Date.now(),
//       ...meetingData,
//       organizer: currentUser.id,
//       status: 'scheduled'
//     };
//     setMeetings([...meetings, newMeeting]);
//     setCurrentView('dashboard');
//   };

//   const joinMeeting = (meeting) => {
//     setActiveMeeting(meeting);
//     setCurrentView('meeting');
//   };

//   const leaveMeeting = () => {
//     setActiveMeeting(null);
//     setCurrentView('dashboard');
//   };

//   const value = {
//     // State
//     currentUser,
//     currentView,
//     meetings,
//     activeMeeting,
//     users,
//     isMuted,
//     isCameraOff,
//     isScreenSharing,
    
//     // Actions
//     login,
//     logout,
//     scheduleMeeting,
//     joinMeeting,
//     leaveMeeting,
//     setCurrentView,
//     setIsMuted,
//     setIsCameraOff,
//     setIsScreenSharing
//   };

//   return (
//     <MeetingContext.Provider value={value}>
//       {children}
//     </MeetingContext.Provider>
//   );
// };

import React, { createContext, useContext, useState, useEffect } from "react";

const MeetingContext = createContext();

export const MeetingProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);

    // Mock: load meetings from localStorage
    const saved = JSON.parse(localStorage.getItem("meetings")) || [];
    setMeetings(saved);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const scheduleMeeting = (meeting) => {
    const updated = [...meetings, meeting];
    setMeetings(updated);
    localStorage.setItem("meetings", JSON.stringify(updated));
  };

  const joinMeeting = (meetingId) => {
    const m = meetings.find((mt) => mt.id === meetingId);
    if (m && !m.participants.includes(currentUser.id)) {
      m.participants.push(currentUser.id);
      setMeetings([...meetings]);
      localStorage.setItem("meetings", JSON.stringify(meetings));
    }
    setActiveMeeting(m);
  };

  const leaveMeeting = () => {
    setActiveMeeting(null);
  };

  return (
    <MeetingContext.Provider
      value={{
        currentUser,
        login,
        meetings,
        scheduleMeeting,
        activeMeeting,
        joinMeeting,
        leaveMeeting,
        isMuted,
        isCameraOff,
        isScreenSharing,
        setIsMuted,
        setIsCameraOff,
        setIsScreenSharing,
      }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => useContext(MeetingContext);

