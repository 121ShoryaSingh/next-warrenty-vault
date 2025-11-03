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
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function EmailCheck() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setIsVerified(false);
      const response = await axios.post('/api/ResetPassword', { email });

      if (response.status === 200) {
        setIsVerified(true);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorData = error.response.data;
          setError(errorData.message);
        } else if (error.request) {
          setError('No server response. Check your connection.');
        } else {
          setError(error.message);
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Request failed');
      }
    } finally {
      setLoading(false);
    }
  };

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
          <form
            className="max-w-xl py-10 bg-slate-950/50 mx-auto border border-slate-800 rounded-xl px-4"
            onSubmit={handleSubmit}
          >
            <FieldGroup className="max-w-md mx-auto">
              <FieldSet>
                <div className="text-slate-100 text-2xl font-medium text-center">
                  <FieldLegend>Forgot Your Password?</FieldLegend>
                  <FieldDescription>
                    Enter your registered email.
                  </FieldDescription>
                </div>
                <FieldGroup>
                  <div className="flex justify-center items-center">
                    {error && (
                      <p className="w-full text-center text-sm text-red-400 border border-red-600 bg-red-800/70 py-2 rounded-xl">
                        {error}
                      </p>
                    )}
                  </div>
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
              <Button
                className="bg-blue-600 cursor-pointer hover:bg-blue-800 duration-300 ease-in"
                disabled={loading}
                type="submit"
              >
                Submit
              </Button>
              <div className="flex justify-center items-center">
                {isVerified && (
                  <p className="border border-blue-600 bg-blue-600/40 text-blue-200 text-center text-sm w-full rounded-xl py-2">
                    Email has been sent with instructions to reset their
                    password.
                  </p>
                )}
              </div>
            </FieldGroup>
          </form>
        </Section>
      </div>
    </div>
  );
}
