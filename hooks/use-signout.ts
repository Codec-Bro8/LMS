"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignOut() {
  const router = useRouter();
  const handleSignOut = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("SIgned out sucessfully"); // redirect to login page
        },
        onError: (error) => {
          toast.error(`Error signing out: ${error.response}`);
        },
      },
    });
  };
  return handleSignOut;
}
