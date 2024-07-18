'use client'

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

import { signIn } from 'next-auth/react'

export default async function Header() {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button onClick={() => signIn('github')}>
            <Github className="mr-2 h-4 w-4" /> Login with Email
        </Button>
      </main>
    );
  }