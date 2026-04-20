import React, { useState } from 'react';

const Login = () => {
  // 1. Create 'State' to hold the text the user types
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 2. Place your logic here
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

      if (response.ok) {
        const data = await response.json();
        // Save the "Digital ID Card" to the browser's memory
        localStorage.setItem("token", data.access_token);
        alert("Login Successful! Check your console to see your token.");
        console.log("Your JWT Token:", data.access_token);
        
        // Optional: Refresh the page to update the UI
        window.location.reload(); 
      } else {
        alert("Login failed! Check your email or password.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert("Could not connect to the Python backend. Is it running?");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Shop</h2>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            required
            className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input 
            type="password" 
            required
            className="mt-1 w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;