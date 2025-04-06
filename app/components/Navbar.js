"use client";

import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) console.error("Login error:", error);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link href="/" className="text-lg font-bold">DevConnect</Link>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <p>Welcome, {user.user_metadata.full_name}</p>
            <button onClick={handleSignOut} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        ) : (
          <button onClick={handleSignIn} className="bg-blue-500 px-4 py-2 rounded">
            Sign in with Google
          </button>
        )}
      </div>
    </nav>
  );
}