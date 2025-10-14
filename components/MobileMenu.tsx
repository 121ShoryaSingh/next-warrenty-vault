import { useSession } from 'next-auth/react';
import Section from './Section';
import { Button } from './ui/button';
import { LogOutIcon } from 'lucide-react';

export default function MobileNav() {
  const session = useSession();

  return (
    <div className="min-h-screen md:hidden bg-gradient-to-br from-slate-800 via-slate-500 to-slate-800 pt-32 flex w-full overflow-hidden fixed">
      <Section className="w-full">
        <div className="flex flex-col items-center text-slate-100 gap-4">
          {session.status === 'unauthenticated' ? (
            <>
              <Button className=" bg-blue-600 hover:bg-blue-500 hover:text-white duration-300 cursor-pointer ease-in-out w-full">
                Account
              </Button>
              <Button className=" cursor-pointer bg-black hover:bg-black/80 duration-300 ease-in-out w-full">
                <LogOutIcon /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                className="hover:bg-slate-700 bg-slate-900 hover:text-slate-100 ease-in-out duration-300 w-full"
                variant="ghost"
              >
                Login
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-400 ease-in-out duration-300 w-full">
                Get Started
              </Button>
            </>
          )}
        </div>
      </Section>
    </div>
  );
}
