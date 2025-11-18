"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/ai-lms-logo.png";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "./userDropdown";

const navItems = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  console.log("Navbar session:", session);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-backgound/60">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href={"/"} className="flex items-center space-x-2 mr-4">
          <Image src={logo} alt="logo" className="size-9 rounded-full" />
          <span className="font-bold">Synapse.</span>
        </Link>
        {/* Desktop Nav */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            {navItems.map((item, index) => (
              <Link
                href={item.href}
                key={item.name}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                image={session.user.image || ""}
                name={session.user.name}
              />
            ) : (
              <>
                <Link
                  href={"/login"}
                  className={buttonVariants({
                    variant: "secondary",
                  })}
                >
                  Login
                </Link>
                <Link href={"/login"} className={buttonVariants()}>
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
