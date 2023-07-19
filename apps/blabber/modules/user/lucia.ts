/* eslint-disable @typescript-eslint/no-explicit-any */
import 'lucia-auth/polyfill/node';
import { z } from 'zod';
import { lucia } from 'lucia';
import { nextjs } from 'lucia/middleware';
import { google } from '@lucia-auth/oauth/providers';

export const auth = lucia({
  adapter: {
    session() {
      console.log('session');
      return {
        async deleteSession() {
          console.log('deleteSession');
        },
        async deleteSessionsByUserId() {
          console.log('deleteSessionsByUserId');
        },
        async getSession() {
          console.log('getSession');
          return {};
        },
        async getSessionsByUserId() {
          console.log('getSessionsByUserId');
          return [];
        },
        async updateSession() {
          console.log('updateSession');
        },
        async setSession() {
          console.log('setSession');
        },
      };
    },
    user() {
      console.log('user');
      return {
        async deleteSession(sessionId) {
          console.log('deleteSession', sessionId);
        },
        async deleteSessionsByUserId(userId) {
          console.log('deleteSessionsByUserId', userId);
        },
        async getSession(sessionId) {
          console.log('getSession', sessionId);
        },
        async getSessionsByUserId(userId) {
          console.log('getSessionsByUserId', userId);
          return [];
        },
        async updateSession(sessionId, partialSession) {
          console.log('updateSession', sessionId, partialSession);
        },
        async setSession(session) {
          console.log('setSession', session);
        },
        async deleteKey(keyId) {
          console.log('deleteKey', keyId);
        },
        async getKey(keyId) {
          console.log('getKey', keyId);
          throw new Error('Method not implemented.');
        },
        async setKey(key) {
          console.log('setKey', key);
        },
        async deleteKeysByUserId(userId) {
          console.log('deleteKeysByUserId', userId);
        },
        async deleteUser(userId) {
          console.log('deleteUser', userId);
        },
        async getUser(userId) {
          console.log('getUser', userId);
          return {};
        },
        async getKeysByUserId(userId: string) {
          return [];
        },
        async setUser(user, key) {
          console.log('setUser', user, key);
        },
        async updateUser(userId, partialUser) {
          console.log('updateUser', userId, partialUser);
        },
        async updateKey(keyId, partialKey) {
          console.log('updateKey', keyId, partialKey);
        },
        async getSessionAndUser(): Promise<
          [any, any] | [null, null]
        > {
          return [null, null];
        },
      };
    },
  },
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  middleware: nextjs(),
  getUserAttributes: (userData) => {
    return {
      username: userData.username,
    };
  },
  getSessionAttributes: (sessionData) => {
    return {
      createdAt: sessionData.created_at,
    };
  },
});

const env = z
  .object({
    GOOGLE_CLIENT_ID: z.string().nonempty(),
    GOOGLE_CLIENT_SECRET: z.string().nonempty(),
  })
  .parse(process.env);

export const googleAuth = google(auth, {
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/api/oauth/google/callback',
  //accessType: 'offline',
  scope: ['email', 'profile'],
});

export type Auth = typeof auth;
