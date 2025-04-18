import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { InteractiveBackground } from '@/components/interactive-background';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Beautiful Authentication with Interactive Backgrounds
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            Experience fluid, responsive design with custom authentication and
            interactive backgrounds that respond to your movements.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/interactive-background">
              <Button size="lg" variant="outline">
                View Interactive Background
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-24 max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border shadow-sm"
            >
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary/10 mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "Custom Authentication",
    description: "Beautifully designed authentication flow with a focus on user experience and security.",
    icon: ({ className }: { className: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Interactive Background",
    description: "Fluid, responsive background that reacts to your mouse movements for an engaging experience.",
    icon: ({ className }: { className: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
        <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
        <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
      </svg>
    ),
  },
  {
    title: "Responsive Design",
    description: "Fully responsive layout that works beautifully on all devices, from mobile to desktop.",
    icon: ({ className }: { className: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="3" x2="21" y1="9" y2="9" />
        <line x1="9" x2="9" y1="21" y2="9" />
      </svg>
    ),
  },
];