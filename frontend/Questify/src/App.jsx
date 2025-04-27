import "tailwindcss"
import React, { useEffect, useState } from "react"
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Flame, Target, Users } from "lucide-react"
import { Card, CardContent } from "./components/ui/Card"
import { Button } from "./components/ui/Button"
import { useTypewriter } from "react-simple-typewriter"
import Sparkles from "./components/ui/Sparkles"
import image1 from "./assets/code-forces.png"
import image2 from "./assets/cc-logo.png"
import Leetcode from './pages/Leetcode';
import MainPage from "./Mainpage"
import AppRoutes from "./AppRoutes" 
const features = [
  {
    title: "Daily Coding Challenges",
    description: "Fresh questions from LeetCode, Codeforces, CodeChef, and GFG.",
    icon: <Flame className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Progress Tracking",
    description: "Visualize your growth with graphs and streaks.",
    icon: <Target className="h-6 w-6 text-green-500" />,
  },
  {
    title: "Community Leaderboards",
    description: "Compete and rise in rankings.",
    icon: <Users className="h-6 w-6 text-blue-500" />,
  },
]

const cardItems = [
  {
    title: "LeetCode",
    description: "Daily LeetCode challenge and problem stats.",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
    link: "https://leetcode.com/",
  },
  {
    title: "Codeforces",
    description: "Track ratings and solve contests.",
    icon: image1,
    link: "https://codeforces.com/",
  },
  {
    title: "CodeChef",
    description: "Daily practice and cook-off insights.",
    icon: image2,
    link: "https://www.codechef.com/dashboard",
  },
  {
    title: "GeeksforGeeks",
    description: "Handpicked challenges and job-focused DSA.",
    icon: "https://media.geeksforgeeks.org/gfg-gg-logo.svg",
    link: "https://www.geeksforgeeks.org/",
  },
]

const FeatureCard = ({ title, description, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="bg-gray-900 p-6 rounded-lg shadow-md text-white"
  >
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
)

const PlatformCard = ({ title, description, icon, link }) => (
  <Link to={link}>
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl shadow-lg border border-gray-700 p-4 bg-gray-800 text-white"
    >
      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
          <img src={icon} alt={`${title} logo`} className="h-12 w-12 object-contain" />
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  </Link>
)

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [text] = useTypewriter({
    words: ['Elevate your coding skills.', 'Solve real-world problems.', 'Crack your dream company.'],
    loop: true,
    delaySpeed: 2000,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
      <main className="flex flex-col items-center justify-center px-4 py-10 space-y-20 bg-black text-white relative">
        <Sparkles className="w-full h-full" />
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center h-screen flex flex-col items-center justify-center space-y-6"
        >
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 text-transparent bg-clip-text">
            CodeMaster Hub
          </h1>
          <p className="text-xl text-gray-400 font-medium h-8">Your hub for daily challenges. Master coding with daily practice from LeetCode, Codeforces, CodeChef, and more.</p>
          <div className="mt-10 flex gap-4 justify-center">
            <Link to={"/mainpage"}>
              <button className="rounded-full px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-semibold flex items-center gap-2 shadow-lg transition">
                Daily Challenges <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link to={"/vjudge"}>
              <button className="rounded-full px-6 py-3 bg-white text-gray-800 hover:bg-gray-100 font-semibold flex items-center gap-2 shadow-lg transition">
                Coding Stats <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
          <a href="#features" className="mt-12 text-sm text-gray-400 hover:text-gray-200 transition animate-bounce">
            Scroll to explore ↓
          </a>
        </motion.section>
  
        <motion.section
          id="features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div>
            <h2 className="text-3xl font-bold text-white">324</h2>
            <p className="text-gray-400">Daily Challenges Solved</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">1.2K+</h2>
            <p className="text-gray-400">Users Competing</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">7+</h2>
            <p className="text-gray-400">Platforms Integrated</p>
          </div>
        </motion.section>
  
        <section className="w-full max-w-5xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why CodeMaster Hub?</h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>
  
        <section className="w-full max-w-6xl px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Explore Platforms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {cardItems.map((item, index) => (
              <PlatformCard key={index} {...item} />
            ))}
          </div>
        </section>
  
        <footer className="w-full mt-20 py-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CodeMaster Hub. All rights reserved.</p>
        </footer>
      </main>
    );
  }