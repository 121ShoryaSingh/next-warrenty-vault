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
import { Eye } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ResetPassword() {
  const params = useParams();
  const router = useRouter();
  const resetToken = params.resetToken as string;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password are not the same');
    } else {
      try {
        setLoading(true);
        setError('');
        const response = await axios.patch('/api/UpdateResetPassword', {
          resetToken,
          newPassword,
        });

        if (response.status === 200) {
          toast('Your password has been change successfully');
          setTimeout(() => {
            router.refresh();
            router.push('/login');
          }, 3000);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            const errorData = error.response.data;
            setError(errorData.message);
            toast.error(errorData.message);
          } else if (error.request) {
            setError('No server response. Check your connection.');
            toast.error('No server response. Check your connection.');
          } else {
            setError(error.message);
            toast.error(error.message);
          }
        } else if (error instanceof Error) {
          setError(error.message);
          toast(error.message);
        } else {
          setError('Request failed');
          toast('Request failed');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 lg:pt-32 md:pt-16 pt-8">
        <div className=" mx-auto">
          <Section className="flex-col">
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
                    <FieldLegend>Change password</FieldLegend>
                    <FieldDescription>Enter new password.</FieldDescription>
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
                        htmlFor="newPassword"
                        className="text-slate-100"
                      >
                        New password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id="Password"
                          required
                          onChange={handleNewPassword}
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
                    </Field>
                    <Field>
                      <FieldLabel
                        htmlFor="confirmPassword"
                        className="text-slate-100"
                      >
                        Confirm Password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id="Password"
                          required
                          onChange={handleConfirmPassword}
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
              </FieldGroup>
            </form>
          </Section>
        </div>
      </div>
    </div>
  );
}
