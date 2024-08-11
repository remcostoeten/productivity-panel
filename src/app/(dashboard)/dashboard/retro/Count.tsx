'use client'

import { useEffect, useState } from "react";

interface CountUpProps {
  start: number;
  end: number;
  duration: number; // duration in seconds
}

const CountUp: React.FC<CountUpProps> = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    const increment = (end - start) / ((duration * 1000) / 60); // Calculate increment per frame (assuming 60 FPS)
    let currentCount = start;

    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= end) {
        clearInterval(interval);
        setCount(end);
      } else {
        setCount(currentCount);
      }
    }, 1000 / 60); // Update every frame (60 FPS)

    return () => clearInterval(interval);
  }, [start, end, duration]);

  return <span>{Math.floor(count)}</span>;
};

export default CountUp;
