"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatsT } from "../types.admin";

export function SiteVisitStatsClient({
  initialStats,
}: {
  initialStats: StatsT;
}) {
  const [stats, setStats] = useState(initialStats);

  // Function to increment visits for a specific path
  const incrementVisits = (path: string) => {
    setStats((prevStats) => {
      const newTopPaths = prevStats.topPaths.map((item) =>
        item.path === path ? { ...item, count: item.count + 1 } : item,
      );

      return {
        ...prevStats,
        totalVisits: prevStats.totalVisits + 1,
        topPaths: newTopPaths,
      };
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Site Visit Statistics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard title="Total Visits" value={stats.totalVisits} />
        <StatCard title="Unique Visitors" value={stats.uniqueVisitors} />
      </div>

      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Top 5 Visited Pages
      </h3>
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats.topPaths}>
            <XAxis dataKey="path" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="space-y-2">
        {stats.topPaths.map((path, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-3 rounded"
          >
            <span className="text-gray-800">{path.path}</span>
            <div>
              <span className="font-semibold text-gray-600 mr-2">
                {path.count} visits
              </span>
              <button
                onClick={() => incrementVisits(path.path)}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
              >
                Increment
              </button>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">{title}</h4>
      <p className="text-3xl font-bold text-gray-800">
        {value.toLocaleString()}
      </p>
    </div>
  );
}
