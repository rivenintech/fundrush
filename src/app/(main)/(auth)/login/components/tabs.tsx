"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useState } from "react";
import Login from "./log-in";
import SignUp from "./sign-up";

export const TabsComponent = () => {
  const [tabValue, setTabValue] = useState("login");

  return (
    <div className="self-center p-8">
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-bold">{tabValue === "login" ? "Welcome Back" : "Create an Account"}</h1>
        <p className="text-muted-foreground">
          {tabValue === "login"
            ? "Log in to continue to the admin dashboard."
            : "Sign up to start your first fundraising campaign."}
        </p>
      </div>
      <Tabs defaultValue="login" value={tabValue} onValueChange={setTabValue}>
        <TabsList className="my-4 w-full">
          <TabsTrigger value="login">Log In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Login />
        </TabsContent>
        <TabsContent value="signup">
          <SignUp />
        </TabsContent>
      </Tabs>
      <p className="text-muted-foreground mt-8 text-center text-xs">
        By continuing, you agree to our{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="whitespace-nowrap underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};
