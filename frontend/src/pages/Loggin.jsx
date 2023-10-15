import React, { useState } from "react";

const Loggin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");

  const handleLoginOrSignUp = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          type: isSignUp ? "signup" : "login",
        }),
      });

      const data = await response.json();

      if (data.success && !isSignUp) {
        localStorage.setItem("loggedInUser", username);
        setMessage("Logged in successfully");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else if (data.success) {
        setMessage("Registered successfully");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-semibold mb-4">
          {isSignUp ? "Sign Up" : "Login"}
        </h1>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600 mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter username"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-600 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter password"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleLoginOrSignUp}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-gray-600 underline hover:text-gray-800"
          >
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </button>
        </div>

        {message && (
          <div className="mt-4 text-center text-red-500">{message}</div>
        )}
      </div>
    </div>
  );
};

export default Loggin;
