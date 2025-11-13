"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [isLogout, logoutTrans] = useTransition();
  const router = useRouter();
  const signOut = () => {
    logoutTrans(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            toast.success("SIgned out sucessfully"); // redirect to login page
          },
        },
      });
    });
  };
  return (
    <div className="p-24">
      <h1 className="text-2xl font-bold">Welcome to My LMS</h1>
      <ThemeToggle />
      {session ? (
        <>
          <p>Hey {session.user.name || session.user.email}</p>
          <Button onClick={signOut} disabled={isLogout}>
            {isLogout ? "Logging out ..." : "Logout"}
          </Button>
        </>
      ) : (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
    </div>
  );
}
