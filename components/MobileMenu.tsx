import Section from './Section';
import { Button } from './ui/button';

export default function MobileNav() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-500 to-slate-800 pt-32 flex w-full overflow-hidden absolute top-0 left-0 transform -translate-y-full transition-transform duration-500 ease-out">
      <Section className="w-full">
        <div className="flex flex-col items-center text-slate-100 gap-4">
          <Button
            className="hover:bg-slate-700 bg-slate-900 hover:text-slate-100 ease-in-out duration-300 w-full"
            variant="ghost"
          >
            Login
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-400 ease-in-out duration-300 w-full">
            Get Started
          </Button>
        </div>
      </Section>
    </div>
  );
}
