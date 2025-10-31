'use client';
import Logo from '@/components/Logo';
import Section from '@/components/Section';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { ArrowLeft, Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Register() {
  const [userName, setUserName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const router = useRouter();

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

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
      setLoading(true);
      setError('');
      setNameError('');
      setEmailError('');
      setPasswordError('');

      const response = await axios.post('/api/register', {
        name: userName,
        email: email,
        password: password,
      });
      if (response.data?.message === 'User registered successfully!') {
        router.refresh();
        router.push('/login');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const errorData = error.response.data;
          if (errorData.message === 'Invalid input') {
            if (errorData.errors.password) {
              setPasswordError(errorData.errors.password);
            }
            if (errorData.errors.email) {
              setEmailError(errorData.errors.email);
            }
            if (errorData.errors.name) {
              setNameError(errorData.errors.name);
            }
          } else {
            setError(error.response.data.message || 'Registation failed');
          }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 lg:pt-32 md:pt-16 sm:pt-8 pt-4">
      <Section className="flex-col items-center">
        <div className=" max-w-xl flex flex-col gap-8 mb-8 mx-auto">
          <Button
            className="w-fit flex text-slate-100 border border-slate-800 md:hidden duration-300 ease-in"
            variant="ghost"
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
              Register
            </h2>
            <div className="flex justify-center items-center ">
              {error && (
                <div className="w-full text-center text-sm text-red-400 border border-red-600 bg-red-800/70 py-2 rounded-xl">
                  <p>{error}</p>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel
                    htmlFor="fullname"
                    className="text-slate-100"
                  >
                    Full Name
                  </FieldLabel>
                  <Input
                    id="fullanme"
                    required
                    type="text"
                    onChange={handleUserName}
                    placeholder="Enter your full name"
                    className="bg-slate-900/50 border border-slate-800 text-slate-400"
                  />
                </Field>
                <Field>
                  <FieldLabel
                    htmlFor="Email"
                    className="text-slate-100"
                  >
                    Email
                  </FieldLabel>
                  {emailError && (
                    <p className="text-sm text-red-400">{emailError}</p>
                  )}
                  <Input
                    id="Email"
                    required
                    type="email"
                    onChange={handleEmail}
                    placeholder="Enter your email"
                    className="bg-slate-900/50 border border-slate-800 text-slate-400"
                  />
                </Field>
                <Field>
                  <FieldLabel
                    htmlFor="Password"
                    className="text-slate-100"
                  >
                    Password
                  </FieldLabel>
                  {passwordError && (
                    <p className="text-sm text-red-400">{passwordError}</p>
                  )}
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
                      type="button"
                      onClick={handleShowPassword}
                    >
                      <Eye />
                    </Button>
                  </div>
                </Field>
                <Field>
                  <Button
                    className="bg-blue-600 cursor-pointer hover:bg-blue-800 duration-300 ease-in"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? 'Registering....' : 'Register'}
                  </Button>
                </Field>
                <Field>
                  <div className="flex gap-2 justify-center">
                    <p className="text-md text-slate-400">
                      Already a user of warranty vault?
                    </p>
                    <Link
                      href="/login"
                      className="text-blue-400 hover:text-blue-300 duration-300 hover:underline"
                    >
                      Login
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
