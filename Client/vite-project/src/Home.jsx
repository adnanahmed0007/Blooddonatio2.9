import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Users, Activity, Droplet, Award, Shield } from "lucide-react";

const Home = () => {
  const [count, setCount] = useState({ lives: 0, donors: 0, drives: 0 });

  // Animated counter
  useEffect(() => {
    const targets = { lives: 12000, donors: 8500, drives: 1200 };
    const duration = 2000;
    const interval = 50;
    const steps = duration / interval;

    let current = { lives: 0, donors: 0, drives: 0 };
    const increment = {
      lives: targets.lives / steps,
      donors: targets.donors / steps,
      drives: targets.drives / steps
    };

    const timer = setInterval(() => {
      current.lives += increment.lives;
      current.donors += increment.donors;
      current.drives += increment.drives;

      if (current.lives >= targets.lives) {
        clearInterval(timer);
        setCount(targets);
      } else {
        setCount({
          lives: Math.floor(current.lives),
          donors: Math.floor(current.donors),
          drives: Math.floor(current.drives)
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-red-50">

      {/* Hero Section with Animated Background */}
      <section className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold animate-pulse">
              <Heart className="w-4 h-4 fill-current" />
              <span>Saving Lives Together</span>
            </div>

            {/* Main Heading with Gradient */}
            <h1 className="text-5xl md:text-7xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                Give the Gift
              </span>
              <br />
              <span className="text-gray-900">of Life</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              One donation can save up to{" "}
              <span className="font-bold text-red-600">3 lives</span>.
              <br />
              Join our community of heroes making a difference every day.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link
                to="/donate"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Droplet className="w-5 h-5" />
                <span>Donate Now</span>
                <span className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
              </Link>

              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl border-2 border-red-200 hover:border-red-300 transform hover:-translate-y-1 transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                <span>Join as Donor</span>
              </Link>

              <Link
                to="/search"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Activity className="w-5 h-5" />
                <span>Find Blood</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Save Lives",
              text: "Your blood donation can save up to 3 lives. Every drop brings hope to families in need.",
              color: "from-red-500 to-rose-500",
              link: "/donate",
              linkText: "Start Donating"
            },
            {
              icon: Award,
              title: "Be a Hero",
              text: "Join thousands of volunteers making a real difference in your community every single day.",
              color: "from-pink-500 to-rose-500",
              link: "/signup",
              linkText: "Register Now"
            },
            {
              icon: Shield,
              title: "Safe & Secure",
              text: "Professional medical staff ensure your safety with state-of-the-art equipment and protocols.",
              color: "from-rose-500 to-red-500",
              link: "/search",
              linkText: "Learn More"
            }
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl p-8 transform hover:-translate-y-2 transition-all duration-300"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${card.color} mb-6 shadow-lg`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{card.text}</p>

                <Link
                  to={card.link}
                  className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all group-hover:text-red-700"
                >
                  <span>{card.linkText}</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Our Impact</h2>
            <p className="text-xl text-red-100">Making a difference, one donation at a time</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: count.lives, label: "Lives Saved", icon: Heart, suffix: "+" },
              { number: count.donors, label: "Active Donors", icon: Users, suffix: "+" },
              { number: count.drives, label: "Blood Drives", icon: Activity, suffix: "+" }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-10 border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <Icon className="w-12 h-12 text-white" />
                    <h3 className="text-5xl md:text-6xl font-black text-white">
                      {stat.number.toLocaleString()}{stat.suffix}
                    </h3>
                    <p className="text-xl text-red-100 font-medium">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Simple steps to save lives</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Register", desc: "Sign up as a blood donor in minutes" },
            { step: "2", title: "Get Verified", desc: "Complete your profile with blood type" },
            { step: "3", title: "Get Notified", desc: "Receive alerts when blood is needed" },
            { step: "4", title: "Save Lives", desc: "Donate and make a real difference" }
          ].map((item, idx) => (
            <div key={idx} className="relative">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Step Number */}
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center text-3xl font-black text-white shadow-xl">
                    {item.step}
                  </div>
                  {idx < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-red-300 to-transparent"></div>
                  )}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative bg-gradient-to-br from-red-600 via-rose-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-5 -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full opacity-5 -ml-32 -mb-32"></div>

          <div className="relative space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white">Ready to Save Lives?</h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Join thousands of heroes who donate blood regularly. Your contribution can make all the difference.
            </p>

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                <span>Register as Donor</span>
              </Link>

              <Link
                to="/donate"
                className="inline-flex items-center gap-2 bg-red-900 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl border-2 border-red-800 hover:bg-red-800 transform hover:-translate-y-1 transition-all duration-300"
              >
                <Droplet className="w-5 h-5" />
                <span>Donate Blood</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <h3 className="text-2xl font-black bg-gradient-to-r from-red-400 to-rose-400 bg-clip-text text-transparent">
                BloodConnect
              </h3>
              <p className="text-gray-400">
                Connecting donors with those in need. Saving lives together.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Quick Links</h4>
              <div className="flex flex-col space-y-2">
                <Link to="/donate" className="text-gray-400 hover:text-white transition-colors">Donate Blood</Link>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors">Find Donors</Link>
                <Link to="/signup" className="text-gray-400 hover:text-white transition-colors">Register</Link>
              </div>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Resources</h4>
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">How It Works</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg">Contact</h4>
              <div className="flex flex-col space-y-2 text-gray-400">
                <p>support@bloodconnect.com</p>
                <p>1-800-DONATE</p>
                <p>24/7 Emergency Hotline</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">© 2025 BloodConnect. Saving lives, one donation at a time.</p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style >{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Home;