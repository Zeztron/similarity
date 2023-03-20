import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGoogleCredentials(): {
  clientId: string;
  clientSecret: string;
} {
  const { GOOGLE_CLIENT_ID: clientId, GOOGLE_CLIENT_SECRET: clientSecret } =
    process.env;

  if (!clientId) {
    throw new Error('GOOGLE_CLIENT_ID is not defined');
  }

  if (!clientSecret) {
    throw new Error('GOOGLE_CLIENT_SECRET is not defined');
  }

  return { clientId, clientSecret };
}
