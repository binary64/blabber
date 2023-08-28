import { z } from 'zod';
import { lucia } from 'lucia';
import { nextjs } from 'lucia/middleware';
import { google } from '@lucia-auth/oauth/providers';
import { adapter } from '@binary64/lucia-custom-provider';

export const auth = lucia({
  adapter: adapter('http://localhost:8081/v1/graphql', {
    'x-hasura-admin-secret': '123',
  }),
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: nextjs(),
  getUserAttributes: (userData) => userData,
  sessionCookie: {
    expires: false,
  },
});

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().nonempty(),
  GOOGLE_CLIENT_SECRET: z.string().nonempty(),
});

const env = process.env.CI
  ? ({} as z.infer<typeof envSchema>)
  : envSchema.parse(process.env);

export const googleAuth = google(auth, {
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:4200/api/oauth/google',
  //accessType: 'offline',
  scope: ['email', 'profile'],
});

export type Auth = typeof auth;
