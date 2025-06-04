  const MeetingCard = ({ meeting, isPast = false }) => {
    const organizer = users.find(u => u.id === meeting.organizer);
    const meetingDate = new Date(meeting.dateTime);
    const isToday = meetingDate.toDateString() === new Date().toDateString();
    const canJoin = isToday && !isPast && Math.abs(meetingDate - new Date()) < 30 * 60 * 1000;

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', password: 'password' }
      ]);
    
      const [currentView, setCurrentView] = useState('login');
      const [activeMeeting, setActiveMeeting] = useState(null);

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

  export default MeetingCard