import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Heart, Droplet, Search, User, LogIn, UserPlus, LogOut } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: "Home", path: "/", icon: Heart },
    { name: "Find Blood", path: "/search", icon: Search },
    { name: "Donate", path: "/donate", icon: Droplet },
    { name: "Find Blood", path: "/results", icon: Search },
  ];

  const authItems = [
    { name: "Login", path: "/login", icon: LogIn },
    { name: "Register", path: "/signup", icon: UserPlus },
    { name: "Logout", path: "/logout", icon: LogOut },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-white/80 backdrop-blur-sm"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Heart className="w-6 h-6 text-white fill-current" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <span className="text-2xl font-black">
                <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                  Blood
                </span>
                <span className="text-gray-900">Connect</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${isActive
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {authItems.map((item) => {
                const Icon = item.icon;
                const isSignup = item.path === "/signup";
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${isActive
                        ? isSignup
                          ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg"
                          : "bg-gray-900 text-white shadow-lg"
                        : isSignup
                          ? "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-xl"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-screen" : "max-h-0"
            }`}
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-6 space-y-2">
            {/* Navigation Items */}
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                      ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-red-50 hover:text-red-600"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}

            <div className="border-t border-gray-200 my-4"></div>

            {/* Auth Items */}
            {authItems.map((item) => {
              const Icon = item.icon;
              const isSignup = item.path === "/signup";
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                      ? isSignup
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg"
                        : "bg-gray-900 text-white shadow-lg"
                      : isSignup
                        ? "bg-gradient-to-r from-red-600 to-rose-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Header;