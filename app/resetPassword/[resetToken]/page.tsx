'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ResetPassword() {
  const params = useParams();
  const resetToken = params.resetToken as string;
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return <div></div>;
}
