import { User } from "lucide-react";
import { useMeeting } from "./Context/userContext";
import React from "react";

const MeetingRoom = () => {
  const { 
    activeMeeting, 
    users, 
    currentUser, 
    leaveMeeting,
    isMuted,
    isCameraOff,
    isScreenSharing,
    setIsMuted,
    setIsCameraOff,
    setIsScreenSharing
  } = useMeeting();

  const organizer = users.find(u => u.id === activeMeeting.organizer);
  const participants = users.filter(u => activeMeeting.participants.includes(u.id));

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
export default MeetingRoom;