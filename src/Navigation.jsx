import { LogOut, Video } from "lucide-react";
import { useMeeting } from "./Context/userContext";
import React from "react";

const Navigation = () => {
  const { currentUser, currentView, setCurrentView, logout } = useMeeting();

  return (
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
              onClick={logout}
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;