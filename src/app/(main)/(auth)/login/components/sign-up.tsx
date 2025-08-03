"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    toast.error("To prevent abuse, sign up is disabled for now. Please use the demo login credentials.");
    return;

    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match.");
    //   return;
    // }

    await authClient.signUp.email(
      {
        email, // user email address
        password, // user password
        name, // user display name
      },
      {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Signed up successfully! Redirecting...");
          router.push("/admin");
        },
        onError: (ctx) => {
          // display the error message
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault();
        handleSignUp();
      }}
    >
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="username">Name</Label>
        <Input type="text" id="username" placeholder="John Doe" onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      {/* <div className="grid w-full items-center gap-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input type="password" id="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} />
      </div> */}
      <Button type="submit" disabled={loading}>
        Sign Up
      </Button>
    </form>
  );
}
