"use client";

import supabase from "../lib/supabase"; // ✅ Relative path
// Or use "@/lib/supabase" if alias is set

export default function LoginButton() {
  const signInWithGoogle = async () => {
    console.log("🔘 Login button clicked");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000", // ✅ Needed!
      },
    });

    if (error) {
      console.error("❌ Google sign-in error:", error.message);
    } else {
      console.log("✅ Redirecting to Google...");
    }
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="bg-blue-600 text-white px-4 py-2 rounded"
    >
      Sign in with Google
    </button>
  );
}
