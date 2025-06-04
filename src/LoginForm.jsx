import React, { useState } from "react";
import { Video } from "lucide-react";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [currentView, setCurrentView] = useState('login');

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', password: 'password' }
      ]);

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
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-100 to-indigo-500 flex items-center justify-center">
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

  export default LoginForm;