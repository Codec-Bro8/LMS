"use client";
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
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function LoginForm() {
  const [gitPending, startGitTransition] = useTransition();
  const [emailPending, startemailTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const router = useRouter();
  const [email, setEmail] = useState("");
  async function signInwithGithub() {
    startGitTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Successfully signed in with Github! you will be redirected shortly."
            );
          },
          onError: () => {
            toast.error("Failed to sign in with Github.");
          },
        },
      });
    });
  }
  async function signInwithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Successfully signed in with Google! you will be redirected shortly."
            );
          },
          onError: () => {
            toast.error("Failed to sign in with Google.");
          },
        },
      });
    });
  }
  async function SignWithEmail() {
    startemailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: "sign-in",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Email Sent");
            router.push(`/verify-request?email=${encodeURIComponent(email)}`);
          },
          onError: () => {
            toast.error("Failed to send email");
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>
          Login with your Socials or Email Account
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-4 flex flex-col">
        <Button
          className="w-full"
          variant={"outline"}
          onClick={signInwithGoogle}
          disabled={googlePending}
        >
          {googlePending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <Image
                src={"/google_ico.svg"}
                alt="google"
                width={40}
                height={40}
                className="size-4"
              />
              Google
            </>
          )}
        </Button>
        <Button
          className="w-full"
          variant={"outline"}
          onClick={signInwithGithub}
          disabled={gitPending}
        >
          {gitPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Github
            </>
          )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2">Or continue with</span>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button
            className="w-full"
            onClick={SignWithEmail}
            disabled={emailPending}
          >
            {emailPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Send className="size-4" /> <span>Continue with Email</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
