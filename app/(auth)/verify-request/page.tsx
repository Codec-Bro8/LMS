"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader, ShieldCheck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequestPage() {
  const [otp, setOtp] = useState("");
  const [emailPending, setEmailTransition] = useTransition();
  const isOtpComplete = otp.length === 6;
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") as string;
  const verifyOTP = () => {
    setEmailTransition(async () => {
      // verify otp logic here
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Successfully verified OTP! You will be redirected shortly."
            );
            router.push("/");
          },
          onError: () => {
            toast.error("Failed to verify OTP. Please try again.");
          },
        },
      });
    });
  };
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have sent a verification email to your email address. Open the
          email and paste the code below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            maxLength={6}
            className="gap-2"
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs text-muted-foreground">
            Enter the 6-digit code sent to your email
          </p>
        </div>
        <Button
          onClick={verifyOTP}
          className="w-full"
          disabled={emailPending || !isOtpComplete}
        >
          {emailPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <ShieldCheck /> <span>Verify Code</span>
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
