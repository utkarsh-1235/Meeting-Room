import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Video, Plus, Settings, User, LogOut } from 'lucide-react';

const MeetingApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [meetings, setMeetings] = useState([]);
  const [activeMeeting, setActiveMeeting] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', password: 'password' }
  ]);

  const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        setCurrentView('dashboard');
        setError('');
      } else {
        setError('Invalid credentials');
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleLogin();
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <Video className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Meeting Hub</h1>
            <p className="text-gray-600">Sign in to manage your meetings</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
            
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Sign In
            </button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-600">
            Demo credentials: john@example.com / password
          </div>
        </div>
      </div>
    );
  };

  const Dashboard = () => {
    const upcomingMeetings = meetings.filter(m => 
      new Date(m.dateTime) > new Date() && 
      (m.organizer === currentUser.id || m.participants.includes(currentUser.id))
    );

    const pastMeetings = meetings.filter(m => 
      new Date(m.dateTime) <= new Date() && 
      (m.organizer === currentUser.id || m.participants.includes(currentUser.id))
    );

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Meetings</p>
                <p className="text-2xl font-bold text-gray-900">{meetings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{upcomingMeetings.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Organized</p>
                <p className="text-2xl font-bold text-gray-900">
                  {meetings.filter(m => m.organizer === currentUser.id).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Meetings</h3>
            </div>
            <div className="p-6">
              {upcomingMeetings.length === 0 ? (
                <p className="text-gray-500">No upcoming meetings</p>
              ) : (
                <div className="space-y-4">
                  {upcomingMeetings.slice(0, 5).map(meeting => (
                    <MeetingCard key={meeting.id} meeting={meeting} />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Meetings</h3>
            </div>
            <div className="p-6">
              {pastMeetings.length === 0 ? (
                <p className="text-gray-500">No recent meetings</p>
              ) : (
                <div className="space-y-4">
                  {pastMeetings.slice(0, 5).map(meeting => (
                    <MeetingCard key={meeting.id} meeting={meeting} isPast={true} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const MeetingCard = ({ meeting, isPast = false }) => {
    const organizer = users.find(u => u.id === meeting.organizer);
    const meetingDate = new Date(meeting.dateTime);
    const isToday = meetingDate.toDateString() === new Date().toDateString();
    const canJoin = isToday && !isPast && Math.abs(meetingDate - new Date()) < 30 * 60 * 1000;

    const handleJoinMeeting = () => {
      setCurrentView('meeting');
      setActiveMeeting(meeting);
    };

    return (
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{meeting.title}</h4>
            <p className="text-sm text-gray-600 mt-1">
              Organized by {organizer?.name}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {meetingDate.toLocaleDateString()} at {meetingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-sm text-gray-500">
              {meeting.participants.length + 1} participants
            </p>
          </div>
          <div className="flex space-x-2">
            {canJoin && (
              <button
                onClick={handleJoinMeeting}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
              >
                Join
              </button>
            )}
            {isPast && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded text-sm">
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ScheduleMeeting = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [duration, setDuration] = useState(60);

    const handleSchedule = () => {
      if (!title || !dateTime) {
        alert('Please fill in required fields');
        return;
      }
      
      const newMeeting = {
        id: Date.now(),
        title,
        description,
        dateTime,
        duration,
        organizer: currentUser.id,
        participants: selectedParticipants,
        status: 'scheduled'
      };
      setMeetings([...meetings, newMeeting]);
      setCurrentView('dashboard');
      setTitle('');
      setDescription('');
      setDateTime('');
      setSelectedParticipants([]);
      setDuration(60);
    };

    const toggleParticipant = (userId) => {
      setSelectedParticipants(prev => 
        prev.includes(userId) 
          ? prev.filter(id => id !== userId)
          : [...prev, userId]
      );
    };

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Schedule New Meeting</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter meeting title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows="3"
              placeholder="Meeting description (optional)"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
              <input
                type="datetime-local"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={90}>1.5 hours</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Participants</label>
            <div className="space-y-2">
              {users.filter(u => u.id !== currentUser.id).map(user => (
                <div key={user.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedParticipants.includes(user.id)}
                    onChange={() => toggleParticipant(user.id)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{user.name} ({user.email})</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={handleSchedule}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Schedule Meeting
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const MeetingRoom = () => {
    const organizer = users.find(u => u.id === activeMeeting.organizer);
    const participants = users.filter(u => activeMeeting.participants.includes(u.id));
    
    const leaveMeeting = () => {
      setCurrentView('dashboard');
      setActiveMeeting(null);
    };

    return (
      <div className="h-screen bg-gray-900 flex flex-col">
        <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{activeMeeting.title}</h2>
            <p className="text-sm text-gray-300">Organized by {organizer?.name}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm">{participants.length + 1} participants</span>
            <button
              onClick={leaveMeeting}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Leave Meeting
            </button>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
            <div className="bg-gray-800 rounded-lg flex items-center justify-center relative">
              <div className="text-center text-white">
                <User className="h-16 w-16 mx-auto mb-2" />
                <p className="font-semibold">{currentUser.name} (You)</p>
                {isCameraOff && <p className="text-sm text-gray-400">Camera Off</p>}
              </div>
            </div>
            
            {participants.map(participant => (
              <div key={participant.id} className="bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <User className="h-16 w-16 mx-auto mb-2" />
                  <p className="font-semibold">{participant.name}</p>
                </div>
              </div>
            ))}
            
            {activeMeeting.organizer !== currentUser.id && (
              <div className="bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <User className="h-16 w-16 mx-auto mb-2" />
                  <p className="font-semibold">{organizer?.name}</p>
                  <p className="text-sm text-gray-400">Host</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-800 p-4 flex justify-center space-x-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80 transition-opacity`}
          >
            🎤
          </button>
          <button
            onClick={() => setIsCameraOff(!isCameraOff)}
            className={`p-3 rounded-full ${isCameraOff ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80 transition-opacity`}
          >
            📹
          </button>
          <button
            onClick={() => setIsScreenSharing(!isScreenSharing)}
            className={`p-3 rounded-full ${isScreenSharing ? 'bg-blue-600' : 'bg-gray-600'} text-white hover:opacity-80 transition-opacity`}
          >
            🖥️
          </button>
        </div>
      </div>
    );
  };

  const Navigation = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Video className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Meeting Hub</span>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'dashboard' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentView('schedule')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentView === 'schedule' 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Schedule Meeting
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {currentUser?.name}</span>
            <button
              onClick={() => {
                setCurrentUser(null);
                setCurrentView('login');
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );

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
};

export default MeetingApp;