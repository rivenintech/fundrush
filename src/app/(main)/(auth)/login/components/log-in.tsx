"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    await authClient.signIn.email(
      {
        email, // user email address
        password, // user password
      },
      {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onSuccess: () => {
          toast.success("Logged in successfully! Redirecting...");
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
        handleSignIn();
      }}
    >
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="password">Password</Label>
        <Input type="password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <p className="text-muted-foreground text-sm">
        Use <strong>demo@example.com</strong> and <strong>password</strong> to log in as a demo user.
      </p>
      <Button type="submit" disabled={loading}>
        Log In
      </Button>
    </form>
  );
}
