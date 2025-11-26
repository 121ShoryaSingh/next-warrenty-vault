'use client';
import Logo from '@/components/Logo';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Eye } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    router.push('/dashboard');
  }, [session.status, router]);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      const response = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (response.error) {
        if (response.error === 'CredentialsSignin') {
          setError('Invalid email or password');
          toast.error('Invalid email or password');
        } else if (response.error) {
          setError(response.error);
          toast.error(response.error);
        } else {
          setError('Authentication failed. Please try again.');
        }
      } else {
        router.refresh();
        router.push('/dashboard');
      }
    } catch (error: unknown) {
      setError('Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 lg:pt-24 md:pt-16 sm:pt-8 pt-4">
      <Section className="flex-col items-center">
        <div className=" max-w-xl flex flex-col gap-8 mb-8 mx-auto">
          <Button
            className="w-fit flex text-slate-100 border border-slate-800 md:hidden duration-300 ease-in"
            variant="ghost"
            onClick={() => {
              router.push('/');
            }}
          >
            <ArrowLeft />
            Back
          </Button>
          <div className="">
            <Logo />
          </div>
        </div>
        <div className="max-w-xl py-10 bg-slate-950/50 mx-auto border border-slate-800 rounded-xl px-4">
          <FieldSet className="w-full max-w-md mx-auto">
            <h2 className="text-slate-100 text-2xl font-medium text-center">
              Login
            </h2>
            <div className="bg-blue-600/50 py-5 text-center border border-blue-600 rounded-xl">
              <p className="text-slate-100">
                For the demo purposes please use this credentails.
              </p>
              <p className="text-slate-100 text-sm mt-2">
                Email: demo@example4.com, Password: demo12345
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <FieldGroup>
                <div className="flex justify-center items-center ">
                  {error && (
                    <div className="w-full text-center text-sm text-red-400 border border-red-600 bg-red-800/70 py-2 rounded-xl">
                      <p>{error}</p>
                    </div>
                  )}
                </div>
                <Field>
                  <FieldLabel
                    htmlFor="Email"
                    className="text-slate-100"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    id="Email"
                    required
                    type="email"
                    onChange={handleEmail}
                    placeholder="Enter your email"
                    className="bg-slate-900/50 border border-slate-800 text-slate-400"
                  />
                </Field>
                {/* Password */}
                <Field>
                  <FieldLabel
                    htmlFor="Password"
                    className="text-slate-100"
                  >
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="Password"
                      required
                      onChange={handlePassword}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="bg-slate-900/50 border border-slate-800 text-slate-400"
                    />
                    <Button
                      variant="ghost"
                      className={`absolute right-0 cursor-pointer hover:text-blue-500 hover:bg-transparent ${
                        showPassword ? 'text-blue-400' : 'text-slate-400'
                      }`}
                      onClick={handleShowPassword}
                      type="button"
                    >
                      <Eye />
                    </Button>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      href="/emailCheck"
                      className="text-slate-400 hover:underline underline-offset-2 hover:text-blue-400 duration-300 ease-in"
                    >
                      forgot your password?
                    </Link>
                  </div>
                </Field>
                {/* Submit button */}
                <Field>
                  <Button
                    className="bg-blue-600 cursor-pointer hover:bg-blue-800 duration-300 ease-in"
                    type="submit"
                    disabled={isLoading}
                  >
                    Login
                  </Button>
                </Field>
                <Field>
                  <div className="flex gap-2 justify-center">
                    <p className="text-md text-slate-400">
                      New to warranty vault?
                    </p>
                    <Link
                      href="/register"
                      className="text-blue-400 hover:text-blue-300 duration-300 hover:underline"
                    >
                      Register
                    </Link>
                  </div>
                </Field>
              </FieldGroup>
            </form>
          </FieldSet>
        </div>
      </Section>
    </div>
  );
}
