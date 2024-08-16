"use client";

import BEZIER_CURVES from "@/core/helpers/animations/bezier-curves";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { Center } from "../atoms/Center";
import BrandLogo from "../theme/BrandLogo";

export default function PreLoader({ children, duration = 3000 }) {
  const [isLoading, setIsLoading] = useState(true);
  const backgroundControls = useAnimation();
  const logoControls = useAnimation();

  useEffect(() => {
    const flickerAnimation = async () => {
      await logoControls.start({
        opacity: [0.53, 0.7, 0.9, 0.6, 0.7, 0.5, 0.4, 0.9, 1],
        transition: {
          duration: 0.8,
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 1],
          repeat: Infinity,
          repeatType: "reverse",
        },
      });
    };

    flickerAnimation();

    const timer = setTimeout(() => {
      backgroundControls.start({
        opacity: 0,
        y: -1000,
        blur: 1220,
        transition: { duration: 1.5, ease: BEZIER_CURVES.BEZIERTWO },
      });
      logoControls.start({
        opacity: 0,
        scale: 0,
        blur: 100,
        transition: { duration: 1.5, ease: BEZIER_CURVES.BEZIERONE },
      });
      setTimeout(() => setIsLoading(false), 700);
    }, duration);

    return () => clearTimeout(timer);
  }, [backgroundControls, logoControls, duration]);

  if (!isLoading) return children;

  return (
    <motion.div
      className="fixed inset-0"
      initial={{ opacity: 1, y: 0 }}
      animate={backgroundControls}
      style={{
        background: `linear-gradient(to top, 
          rgba(0, 0, 0, 0) 0%, 
          rgba(0, 0, 0, 0.5) 50%, 
          rgba(0, 0, 0, 1) 100%)`,
      }}
    >
      <Center fullScreen>
        <motion.div initial={{ opacity: 1 }} animate={logoControls}>
          <BrandLogo />
        </motion.div>
      </Center>
    </motion.div>
  );
}
