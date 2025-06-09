import { User } from "lucide-react";
import { useMeeting } from "./Context/userContext";
import React, { useEffect, useRef, useState } from "react";

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
    setIsScreenSharing,
  } = useMeeting();

  const localVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);

  const organizer = users.find((u) => u.id === activeMeeting.organizer);
  const participants = users.filter((u) => activeMeeting.participants.includes(u.id));

  // Get user media when camera/mic is enabled
  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: !isCameraOff,
          audio: !isMuted,
        });
        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Failed to get user media", err);
      }
    };

    getMedia();
  }, [isCameraOff, isMuted]);

  // Apply mute/camera toggle to stream tracks
  useEffect(() => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => track.enabled = !isMuted);
      localStream.getVideoTracks().forEach(track => track.enabled = !isCameraOff);
    }
  }, [isMuted, isCameraOff, localStream]);

  // Handle screen sharing
  const handleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const screenTrack = screenStream.getVideoTracks()[0];

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = screenStream;
        }

        screenTrack.onended = () => {
          setIsScreenSharing(false);
          if (localStream && localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
          }
        };

        setIsScreenSharing(true);
      } catch (err) {
        console.error("Screen share failed", err);
      }
    } else {
      // Stop screen sharing
      if (localStream && localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
      setIsScreenSharing(false);
    }
  };

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Top bar */}
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

      {/* Video Grid */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Current User */}
          <div className="bg-gray-800 rounded-lg flex items-center justify-center relative h-64">
            {isCameraOff ? (
              <div className="text-center text-white">
                <User className="h-16 w-16 mx-auto mb-2" />
                <p className="font-semibold">{currentUser.name} (You)</p>
                <p className="text-sm text-gray-400">Camera Off</p>
              </div>
            ) : (
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>

          {/* Other Participants */}
          {participants.map((participant) => (
            <div key={participant.id} className="bg-gray-800 rounded-lg flex items-center justify-center h-64">
              <div className="text-center text-white">
                <User className="h-16 w-16 mx-auto mb-2" />
                <p className="font-semibold">{participant.name}</p>
              </div>
            </div>
          ))}

          {/* Organizer Box (if not current user) */}
          {activeMeeting.organizer !== currentUser.id && (
            <div className="bg-gray-800 rounded-lg flex items-center justify-center h-64">
              <div className="text-center text-white">
                <User className="h-16 w-16 mx-auto mb-2" />
                <p className="font-semibold">{organizer?.name}</p>
                <p className="text-sm text-gray-400">Host</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="bg-gray-800 p-4 flex justify-center space-x-4">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-3 rounded-full ${isMuted ? "bg-red-600" : "bg-gray-600"} text-white hover:opacity-80 transition-opacity`}
        >
          🎤
        </button>
        <button
          onClick={() => setIsCameraOff(!isCameraOff)}
          className={`p-3 rounded-full ${isCameraOff ? "bg-red-600" : "bg-gray-600"} text-white hover:opacity-80 transition-opacity`}
        >
          📹
        </button>
        <button
          onClick={handleScreenShare}
          className={`p-3 rounded-full ${isScreenSharing ? "bg-blue-600" : "bg-gray-600"} text-white hover:opacity-80 transition-opacity`}
        >
          🖥️
        </button>
      </div>
    </div>
  );
};

export default MeetingRoom;


