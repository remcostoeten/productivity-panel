// src/components/auth/SiteVisitStats.tsx
"use client";

import { useEffect, useState } from "react";

const SiteVisitStats = () => {
  const [count, setCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUniqueVisitorCount = async () => {
      try {
        const response = await fetch("/api/visits");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCount(data.uniqueVisitors ?? 0);
      } catch (err) {
        setError("Failed to fetch unique visitor count.");
        console.error(err);
      }
    };

    fetchUniqueVisitorCount();
  }, []);

  return (
    <div>
      <h2>Unique Visitors: {count !== null ? count : "Loading..."}</h2>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SiteVisitStats;
