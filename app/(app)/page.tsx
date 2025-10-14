import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell, File, Lock } from 'lucide-react';

export default function Home() {
  const data = [
    {
      title: 'Secure Storage',
      desc: 'Your warranties are encrypted and stored securely with bank-level security',
      icon: Lock,
    },
    {
      title: 'Expiry Alerts',
      desc: 'Get notified before your warranties expire so you never miss a claim',
      icon: Bell,
    },
    {
      title: 'Receipt Scanning',
      desc: 'Upload photos or PDFs of your receipts and access them anytime',
      icon: File,
    },
  ];

  return (
    <div className="pt-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="min-h-screen">
        <Section className="text-white">
          <div className="text-center max-w-2xl py-6 mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-100 mb-6">
              Never Lose a Warranty Again
            </h1>
            <p className="text-xl font-medium max-w-2xl text-slate-400 mb-6 ">
              Securely store, track manage all warranty documents in one place.
              Get notified beforee they expire.
            </p>
            <div>
              <Button className="bg-blue-600 hover:bg-blue-500 duration-300 ease-in">
                Start Free Trial
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {data.map((data, index) => {
              const Icon = data.icon;
              return (
                <Card
                  className="bg-slate-900/50 border border-slate-800"
                  key={index}
                >
                  <CardHeader>
                    <Icon className="text-blue-400 h-12 w-12" />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl text-slate-100">
                      {data.title}
                    </CardTitle>
                  </CardContent>
                  <CardFooter>
                    <CardDescription className="text-slate-400">
                      {data.desc}
                    </CardDescription>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </Section>
      </div>
      <footer className="bg-slate-950/50 border-t border-slate-800 py-6 text-center">
        <p className="text-sm text-slate-400">
          © 2025 Warranty Vault. All rights reserved
        </p>
      </footer>
    </div>
  );
}
