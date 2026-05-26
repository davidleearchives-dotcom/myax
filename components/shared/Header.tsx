"use client";

import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const { theme, toggle } = useTheme();
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-content items-center justify-between px-6">
        <Link href="/" className="font-serif text-lg font-bold tracking-tight text-foreground">
          My<span className="text-accent">AX</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/guide"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "font-display")}
          >
            가이드
          </Link>
          <Link
            href="/diagnosis/info"
            className={cn(
              buttonVariants({ variant: "accent", size: "sm" }),
              "hidden sm:inline-flex rounded-pill font-display",
            )}
          >
            진단 시작
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </nav>
      </div>
    </header>
  );
}
