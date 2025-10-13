'use client';
import { useState } from 'react';
import Logo from './Logo';
import Section from './Section';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import MobileNav from './MobileMenu';

export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(true);

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
              <Button
                className="hover:bg-slate-700 hover:text-slate-100 ease-in-out duration-300"
                variant="ghost"
              >
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-400 ease-in-out duration-300">
                Get Started
              </Button>
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
        <div className="transition-all slide-in-from-top-60 duration-700">
          <MobileNav />
        </div>
      )}
    </>
  );
}
