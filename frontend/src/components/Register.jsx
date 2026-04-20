import React, { useState } from 'react';

const Register = () => {
  // 1. We need these "State" variables to hold what the user types
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await fetch(`${apiUrl}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Account created! You can now log in.");
        // Optional: you could redirect them to the login view here
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (err) {
      alert("Could not connect to server. Is the Python backend running?");
    }
  };

  // 2. This "return" block is the UI the user actually sees
  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Create Account</h2>
      
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input 
            type="email" 
            required
            className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            required
            className="w-full mt-1 p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;