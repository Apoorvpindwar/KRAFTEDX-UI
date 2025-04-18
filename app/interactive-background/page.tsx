"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { InteractiveBackground } from "@/components/interactive-background";

export default function InteractiveBackgroundPage() {
  const [mouseInfo, setMouseInfo] = useState({ x: 0, y: 0 });

  // Update mouse coordinates for demo purposes
  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseInfo({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="relative min-h-screen" onMouseMove={handleMouseMove}>
      <InteractiveBackground />
      
      <div className="relative z-10 flex flex-col min-h-screen px-4 pt-16">
        <div className="max-w-4xl mx-auto w-full pt-16 pb-8">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl font-bold mb-6">Interactive Background</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg">
              This page showcases an interactive background gradient that responds to your mouse movements, 
              inspired by the design on kraftedx.com. Move your mouse around to see how the gradient flows and follows.
            </p>
            
            <div className="mt-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1 bg-card/50 backdrop-blur-sm p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">How It Works</h2>
                <p>
                  The background tracks your cursor position and uses that data to create a dynamic, 
                  flowing gradient that follows your movements. This creates an engaging and interactive experience.
                </p>
                <p className="mt-4">
                  We've implemented this using a combination of React hooks to track mouse position and 
                  Framer Motion for smooth animations. The color scheme adapts to both light and dark modes.
                </p>
              </div>
              
              <div className="flex-1 bg-card/50 backdrop-blur-sm p-6 rounded-lg border shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Mouse Position</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">X Coordinate</p>
                    <p className="text-2xl font-mono">{mouseInfo.x}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Y Coordinate</p>
                    <p className="text-2xl font-mono">{mouseInfo.y}</p>
                  </div>
                </div>
                <div className="mt-4 bg-background/50 p-4 rounded border">
                  <p className="text-sm">
                    Move your cursor around to see how the background responds to your movements.
                    The gradient's center point follows your cursor position.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}