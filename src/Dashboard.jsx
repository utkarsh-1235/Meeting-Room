import React, { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import MeetingCard from './MeetingCard';



const Dashboard = () => {

const [meetings, setMeetings] = useState([]);
const [currentUser, setCurrentUser] = useState(null);
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

  export default Dashboard;