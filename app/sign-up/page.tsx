"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import { AuthForm } from "@/components/auth/auth-form";
import { InteractiveBackground } from "@/components/interactive-background";
import { toast } from "@/hooks/use-toast";

export default function SignUpPage() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const handleSignIn = async (email: string, password: string) => {
    router.push("/sign-in");
  };

  const handleSignUp = async (email: string, password: string) => {
    if (!isLoaded) return;

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
      });

      if (result.status === "complete") {
        router.push("/dashboard");
        toast({
          title: "Account created!",
          description: "You have successfully signed up.",
        });
      } else {
        console.error("Sign up incomplete", result);
        toast({
          variant: "destructive",
          title: "Sign up incomplete",
          description: "Please complete the sign up process.",
        });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        variant: "destructive",
        title: "Sign up failed",
        description: "There was a problem creating your account. Please try again.",
      });
    }
  };

  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <AuthForm type="sign-up" signIn={handleSignIn} signUp={handleSignUp} />
      </div>
    </div>
  );
}