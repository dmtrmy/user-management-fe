import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabaseClient from "@/lib/supabaseClient";
import { useUserContext } from "@/context/UserContext"; // Access UserContext
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UserContextData, UserMetadata } from '@/types/user';

export function CardWithForm() {
  const { updateUserData } = useUserContext(); // Hook to update context data
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Email/Password Signup
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = e.currentTarget.name.value; // Capture name
    const email = e.currentTarget.email.value; // Capture email
    const password = e.currentTarget.password.value; // Capture password

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Update user data in context
      updateUserData({ name, email });

      const { error: authError } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: name, // Use metadata field for storing name
          },
        },
      });

      if (authError) throw authError;

      // Wait for the user session to be established
      const { data: sessionData, error: sessionError } = await supabaseClient.auth.getSession();

      if (sessionError) throw sessionError;

      console.log("Session Data:", sessionData);

      // Redirect to the Address Form page after successful signup
      navigate("/thank-you");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Signup
const handleGoogleSignup = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${import.meta.env.VITE_SITE_URL}/thank-you`, // Let Supabase handle the redirection
        },
      });
  
      if (error) throw error;
  
      console.log("Google OAuth initiated successfully. User will be redirected.");
      // No further actions needed as Supabase will handle the redirection to `/thank-you`.
    } catch (err: any) {
      setError(err.message);
      console.error("Google signup error:", err);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create an account to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="grid w-full items-center gap-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {/* Name Input */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>
            {/* Email Input */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Password Input */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            {/* Signup Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing up..." : "Signup"}
            </Button>
          </div>
        </form>
        <div className="border-t my-4" />
        <Button
          type="button"
          className="w-full bg-white text-gray-900 border hover:bg-gray-100"
          onClick={handleGoogleSignup}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup with Google"}
        </Button>
      </CardContent>
    </Card>
  );
}