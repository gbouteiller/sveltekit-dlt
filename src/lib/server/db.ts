import {dev} from '$app/environment';
import {TURSO_AUTH_TOKEN, TURSO_URL, } from '$env/static/private';
import {createClient} from '@libsql/client';
import {drizzle} from 'drizzle-orm/libsql';

export const dbClient = createClient({
  url: dev ? 'file:./local.db' :TURSO_URL,
  authToken: dev ? '': TURSO_AUTH_TOKEN,
});

export const db = drizzle(dbClient);