import React, { useState } from "react";

const ScheduleMeeting = () => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dateTime, setDateTime] = useState('');
    const [selectedParticipants, setSelectedParticipants] = useState([]);
    const [duration, setDuration] = useState(60);

     const [currentUser, setCurrentUser] = useState(null);
      const [currentView, setCurrentView] = useState('login');
      const [meetings, setMeetings] = useState([]);

      const [users, setUsers] = useState([
          { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password' },
          { id: 3, name: 'Mike Johnson', email: 'mike@example.com', password: 'password' }
        ]);

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
    
if (!currentUser) {
    return (
      <div className="p-6 text-red-600 font-semibold">
        Please log in to schedule a meeting.
      </div>
    );
  }
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

  export default ScheduleMeeting;