import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <section>
      <header>
        <LoginButton>
          <Button>Get Started</Button>
        </LoginButton>
      </header>
      <main className="h-full">
        <div className="flex items-center justify-center">
          <p>Welcome to Scriptly. Your Grammar Companion</p>
        </div>
      </main>
    </section>
  );
}
