import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './App';
import MainPage from './Mainpage';
import Leetcode from './pages/Leetcode';
import Codeforces from './pages/Codeforces';
import Codechef from './pages/Codechef';
import VJudgeTracker from './pages/Vjudge';
import VJudgeDashboard from './pages/VjudgeDashboard';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="vjudge" element={<VJudgeTracker />} />
      <Route path="vjudge/:username" element={<VJudgeDashboard />} />
      <Route path="/mainpage" element={<MainPage />}>
        <Route index element={<Navigate to="leetcode" replace />} />
        
        <Route path="leetcode" element={<Leetcode />} />
        <Route path="codeforces" element={<Codeforces />} />
        <Route path="codechef" element={<Codechef />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
