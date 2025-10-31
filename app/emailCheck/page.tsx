'use client';
import Logo from '@/components/Logo';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function EmailCheck() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {};

  const handleBackButton = () => {
    router.refresh();
    router.push('/login');
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 lg:pt-32 md:pt-16 pt-8">
      <div className=" mx-auto">
        <Section className="flex-col">
          <Button
            className="w-fit flex text-slate-100 border border-slate-800 md:hidden duration-300 ease-in"
            variant="ghost"
            onClick={handleBackButton}
          >
            <ArrowLeft />
            Back
          </Button>
          <div className=" mb-8">
            <Logo />
          </div>
          <form className="max-w-xl py-10 bg-slate-950/50 mx-auto border border-slate-800 rounded-xl px-4">
            <FieldGroup className="max-w-md mx-auto">
              <FieldSet>
                <div className="text-slate-100 text-2xl font-medium text-center">
                  <FieldLegend>Forgetten Password</FieldLegend>
                  <FieldDescription>
                    Enter the registered email
                  </FieldDescription>
                </div>
                <FieldGroup>
                  <Field>
                    <FieldLabel
                      htmlFor="email"
                      className="text-slate-100"
                    >
                      Email
                    </FieldLabel>
                    <Input
                      id="email"
                      required
                      onChange={handleEmail}
                      placeholder="Enter your email"
                      className="bg-slate-900/50 border border-slate-800 text-slate-400"
                    />
                  </Field>
                </FieldGroup>
              </FieldSet>
              <Button className="bg-blue-600 cursor-pointer hover:bg-blue-800 duration-300 ease-in">
                Submit
              </Button>
            </FieldGroup>
          </form>
        </Section>
      </div>
    </div>
  );
}
