"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

export function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState<Point>({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    // Initial dimensions
    updateDimensions();

    // Set up event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", updateDimensions);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  // Calculate gradient position
  const gradientPosition = {
    x: mousePosition.x / dimensions.width,
    y: mousePosition.y / dimensions.height,
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden -z-10"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            `radial-gradient(circle at ${gradientPosition.x * 100}% ${
              gradientPosition.y * 100
            }%, hsl(var(--chart-1)), hsl(var(--chart-2)), hsl(var(--chart-3)))`,
            `radial-gradient(circle at ${gradientPosition.x * 100}% ${
              gradientPosition.y * 100
            }%, hsl(var(--chart-2)), hsl(var(--chart-3)), hsl(var(--chart-4)))`,
            `radial-gradient(circle at ${gradientPosition.x * 100}% ${
              gradientPosition.y * 100
            }%, hsl(var(--chart-3)), hsl(var(--chart-4)), hsl(var(--chart-5)))`,
            `radial-gradient(circle at ${gradientPosition.x * 100}% ${
              gradientPosition.y * 100
            }%, hsl(var(--chart-4)), hsl(var(--chart-5)), hsl(var(--chart-1)))`,
            `radial-gradient(circle at ${gradientPosition.x * 100}% ${
              gradientPosition.y * 100
            }%, hsl(var(--chart-5)), hsl(var(--chart-1)), hsl(var(--chart-2)))`,
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Floating elements that respond to mouse */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full mix-blend-overlay"
            style={{
              background: `hsl(var(--chart-${(index % 5) + 1}))`,
              width: `${Math.random() * 20 + 10}rem`,
              height: `${Math.random() * 20 + 10}rem`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.1,
              filter: "blur(8rem)",
            }}
            animate={{
              x: [
                (mousePosition.x - dimensions.width / 2) * -0.02 * (index + 1),
                (mousePosition.x - dimensions.width / 2) * -0.03 * (index + 1),
              ],
              y: [
                (mousePosition.y - dimensions.height / 2) * -0.02 * (index + 1),
                (mousePosition.y - dimensions.height / 2) * -0.03 * (index + 1),
              ],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}
      </div>
    </div>
  );
}