'use client';
import { useState } from 'react';
import Logo from './Logo';
import Section from './Section';
import { Button } from './ui/button';
import { LogOutIcon, Menu } from 'lucide-react';
import MobileNav from './MobileMenu';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const session = useSession();
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogin = () => {
    router.refresh();

    router.push('/login');
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  const handleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  return (
    <>
      <div className="py-4 w-screen bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 fixed z-40">
        <Section className="">
          <div className="flex justify-between">
            <div>
              <Logo />
            </div>
            <div className="hidden md:flex items-center text-slate-100 gap-4">
              {session.status === 'authenticated' ? (
                <>
                  <Button className="border border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white duration-300 cursor-pointer ease-in-out">
                    Account
                  </Button>
                  <Button
                    className=" cursor-pointer bg-blue-600 hover:bg-blue-500 duration-300 ease-in-out"
                    onClick={handleLogout}
                  >
                    <LogOutIcon />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="hover:bg-slate-700 hover:text-slate-100 ease-in-out duration-300"
                    variant="ghost"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-400 ease-in-out duration-300">
                    Get Started
                  </Button>
                </>
              )}
            </div>
            {/* Mobile menu button */}
            <div className="flex md:hidden items-center">
              <Button
                variant="ghost"
                className="hover:bg-slate-700 ease-in-out duration-300"
                onClick={handleMobileMenu}
              >
                <Menu className="text-slate-100" />
              </Button>
            </div>
          </div>
        </Section>
      </div>
      {/* Mobile menu */}
      {mobileMenu && (
        <div className="">
          <MobileNav />
        </div>
      )}
    </>
  );
}
