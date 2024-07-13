"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
const page = () => {
  const handleLoginWithOAuth = (provider: "google") => {
    const supabase = createClient();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback",
      },
    });
  };
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="w-96 rounded-md border p-5 space-y-5">
        <h1 className="text-2xl font-bold">Next & supabase</h1>
        <p className="text-sm ">Register/Sign-in today</p>
        <div className="flex flex-col gap-5">
          <Button
            className=" w-full flex items-center gap-2"
            variant="outline"
            onClick={() => handleLoginWithOAuth("google")}
          >
            <FcGoogle />
            Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
