/* eslint-disable @typescript-eslint/no-explicit-any */
//import 'lucia-auth/polyfill/node';
import { z } from 'zod';
import { lucia } from 'lucia';
import { nextjs } from 'lucia/middleware';
import { google } from '@lucia-auth/oauth/providers';

export const auth = lucia({
  adapter: {
    session() {
      console.log('initializing adapter - session');
      return {
        async deleteSession() {
          console.log('session.deleteSession');
        },
        async deleteSessionsByUserId() {
          console.log('session.deleteSessionsByUserId');
        },
        async getSession(sessionId) {
          console.log('session.getSession', sessionId);
          return {
            id: sessionId,
            user_id: 'ruj2tzzekjnbeef',
            active_expires: 1690146754198,
            idle_expires: 1691356354198,
          };
        },
        async getSessionsByUserId() {
          console.log('session.getSessionsByUserId');
          return [];
        },
        async updateSession() {
          console.log('session.updateSession');
        },
        async setSession(session) {
          console.log('session.setSession', session);
        },
      };
    },
    user() {
      console.log('initializing adapter - user');
      return {
        async deleteSession(sessionId) {
          console.log('user.deleteSession', sessionId);
        },
        async deleteSessionsByUserId(userId) {
          console.log('user.deleteSessionsByUserId', userId);
        },
        async getSession(sessionId) {
          console.log('user.getSession', sessionId);
        },
        async getSessionsByUserId(userId) {
          console.log('user.getSessionsByUserId', userId);
          return [];
        },
        async updateSession(sessionId, partialSession) {
          console.log(
            'user.updateSession',
            sessionId,
            partialSession
          );
        },
        async setSession(session) {
          console.log('user.setSession', session);
        },
        async deleteKey(keyId) {
          console.log('user.deleteKey', keyId);
        },
        async getKey(keyId) {
          console.log('user.getKey', keyId);
          return null;
        },
        async setKey(key) {
          console.log('user.setKey', key);
        },
        async deleteKeysByUserId(userId) {
          console.log('user.deleteKeysByUserId', userId);
        },
        async deleteUser(userId) {
          console.log('user.deleteUser', userId);
        },
        async getUser(userId) {
          console.log('user.getUser', userId);

          return {
            id: userId,
            fullName: 'John Doe',
          };
        },
        async getKeysByUserId(userId: string) {
          console.log('user.getKeysByUserId', userId);
          return [];
        },
        async setUser(user, key) {
          console.log('user.setUser', user, key);
        },
        async updateUser(userId, partialUser) {
          console.log('user.updateUser', userId, partialUser);
        },
        async updateKey(keyId, partialKey) {
          console.log('user.updateKey', keyId, partialKey);
        },
        async getSessionAndUser(): Promise<
          [any, any] | [null, null]
        > {
          console.log('user.getSessionAndUser');
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
  redirectUri: 'http://localhost:4200/api/oauth/google',
  //accessType: 'offline',
  scope: ['email', 'profile'],
});

export type Auth = typeof auth;
