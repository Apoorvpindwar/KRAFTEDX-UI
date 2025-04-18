"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";
import { InteractiveBackground } from "@/components/interactive-background";
import { toast } from "@/hooks/use-toast";


export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  const handleSignIn = async (email: string, password: string) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        router.push("/dashboard");
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      } else {
        console.error("Sign in failed", result);
        toast({
          variant: "destructive",
          title: "Sign in failed",
          description: "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      console.error("Error signing in:", error);
      toast({
        variant: "destructive",
        title: "Authentication error",
        description: "There was a problem signing you in. Please try again.",
      });
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    router.push("/sign-up");
  };

  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <AuthForm type="sign-in" signIn={handleSignIn} signUp={handleSignUp} />
      </div>
    </div>
  );
}