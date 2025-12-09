export { auth as proxy } from '@/app/api/(auth)/[...nextauth]/auth';

export const config = {
  matcher: ['/((?!api/ResetPassword).*)', '/((?!api/UpdateResetPassword).*)'],
};
