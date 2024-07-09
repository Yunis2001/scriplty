import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Manrope } from "next/font/google";
import { SocialIcon } from 'react-social-icons'

const manrope = Manrope({weight:['300','400','700'],subsets:['latin']});

export default function Home() {
  return (
    <section className="px-[5%] py-10 bg-gradient-to-r from-slate-50 via-slate-50 to-cyan-300">
      <header className="flex justify-between">
        <Image 
          src='/Logo.svg'
          width={140}
          height={100}
          alt="Scriptly logo featuring an image of a pen and text reading scritply."
        />
        <div>
          <LoginButton mode="login">
            <Button variant='outline' className="rounded-2xl">Login</Button>
          </LoginButton>
          <LoginButton>
            <Button className="rounded-2xl bg-purple-500 p-5 mx-1">Get Started</Button>
          </LoginButton>
        </div>
        
      </header>
      <main className={`h-screen mt-20 ${manrope.className} flex flex-col items-center gap-10 `}>
        <div className="w-full flex justify-center">
          <p className="text-4xl text-center sm:text-5xl md:text-6xl lg:text-7xl xl:w-[600px] font-medium tracking-wide">Make <span className="font-bold underline text-purple-500">writing</span> as easy as it can be!</p>
        </div>
        <div>
          <p className="text-gray-500 text-center text-lg sm:text-xl md:text-2xl lg:w-[700px]">Transform Your Writing with Ease: Your AI-Powered Grammar Assistant for Flawless Communication</p>
        </div>
        <div>
          <LoginButton mode="register">
            <Button size='lg' className="flex items-center gap-2 rounded-2xl p-7">Try for free 
              <span className="rounded-full w-5 h-5 p-5 bg-purple-500 flex items-center justify-center">&#8599;
              </span>
            </Button>
          </LoginButton>
        </div>
      
        <div className="mt-20 flex flex-col items-center gap-7"> 
          <div>
            <p>Trusted By This Brands</p>
          </div>
          <div className="flex gap-5">
            <SocialIcon url="https://linkedin.com/in/couetilc" />
            <SocialIcon url="https://x.com" />
            <SocialIcon url="https://youtube.com" />
            <SocialIcon url="https://google.com" />
            <SocialIcon url="https://pinterest.com" />
            <SocialIcon url="https://facebook.com" />
          </div>   
        </div>
      </main>
    </section>
  );
}
