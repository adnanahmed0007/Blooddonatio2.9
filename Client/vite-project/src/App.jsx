 import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import axios from "axios"
import Home from "./Home"
import Donate from "./Donate"
import Signup from "./Signup"
import Login from "./Login"
import SearchBlood from "./SearchbLood"
import Header from "./Header"
import SearchValue from "./Searchvalue"
import Logout from "./Logout"
import ViewAllBloodRequired from "./ViewAllBloodRequired"
import Admin from "./Admin"
import UserContext from "./Context1"
import Profile from "./Profile"

const App = () => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("user") === "true";
  });

  const [loading, setLoading] = useState(true);

  // ✅ Check real session from backend on every refresh
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get(
          "https://blooddonatio2-9.onrender.com/auth/api/me",
          { withCredentials: true }
        );
        if (res.data.loggedIn) {
          setUser(true);
          localStorage.setItem("user", "true");
        } else {
          setUser(false);
          localStorage.setItem("user", "false");
        }
      } catch (err) {
        setUser(false);
        localStorage.setItem("user", "false");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // ✅ Wrap setUser to also update localStorage
  const handleSetUser = (value) => {
    setUser(value);
    localStorage.setItem("user", value);
  };

  // ⛔ Don't render app until session is verified
  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.2rem",
        color: "#e53e3e"
      }}>
        Loading...
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchBlood />} />
          <Route path="/results" element={<SearchValue />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/allviewblood" element={<ViewAllBloodRequired />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;

