"use client";

import { useState } from "react";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push("/admin");
    }
  };

  useEffect(() => {
  checkSession();
}, []);

const checkSession = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    router.push("/admin");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-white/5 p-10 rounded-3xl w-full max-w-md border border-white/10"
      >
        <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-black/30 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 rounded-xl bg-black/30 mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-violet-600 hover:bg-violet-700 transition-all py-4 rounded-xl font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
}