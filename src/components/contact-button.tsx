"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MouseEvent } from "react";

interface ContactButtonProps {
  locale: string;
  children: React.ReactNode;
  className?: string;
}

export default function ContactButton({ locale, children, className }: ContactButtonProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/${locale}/contact`);
  };

  return (
    <Button
      variant="outline"
      className={`w-full ${className || ""}`}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}
