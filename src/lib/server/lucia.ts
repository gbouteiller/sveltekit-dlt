import {dev} from '$app/environment';
import {libsql} from '@lucia-auth/adapter-sqlite';
import {lucia} from 'lucia';
import {sveltekit} from 'lucia/middleware';
import {dbClient} from './db';

export const auth = lucia({
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),
  adapter: libsql(dbClient, {
    user: 'user',
    key: 'user_key',
    session: 'user_session',
  }),
  getUserAttributes: ({avatar, email, forename, surname}) => ({avatar, email, forename, surname}),
});

// TYPES ===================================================================================================================================
export type Auth = typeof auth;
