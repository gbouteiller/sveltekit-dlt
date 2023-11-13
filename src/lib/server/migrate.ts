import {createClient} from '@libsql/client';
import {drizzle} from 'drizzle-orm/libsql';
import {migrate} from 'drizzle-orm/libsql/migrator';
import {env} from './env';

try {
  const client = createClient({
    url: env.TURSO_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });
  const db = drizzle(client);
  console.log('Running migrations');
  await migrate(db, {migrationsFolder: 'migrations'});
  console.log('Migrated successfully');
} catch (error) {
  console.error('Migration failed');
  console.error(error);
}
