"use client";

import { OAuthSignIn } from "@/components/auto/OAuthSignIn";
//import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export function LoginForm() {
  return (
    <Card className="w-96">
      <form>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Log in</CardTitle>
          <CardDescription className="text-xs">Welcome back</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 p-6">
          <div>
            Don&apos;t have an account?{" "}
            <Link href="/create-account" className="text-blue-500">
              Create account
            </Link>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/forgot-password" className="text-xs text-blue-500">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" />
          </div>

          <Button
            className="w-full"
            type="submit"
            /*<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />*/
          >
            Sign In
          </Button>
        </CardContent>
        <CardFooter>
          <OAuthSignIn />
        </CardFooter>
      </form>
    </Card>
  );
}
