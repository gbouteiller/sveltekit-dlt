import {signout} from '$lib/server/utils';
import {redirect} from '@sveltejs/kit';
import {superValidate} from 'sveltekit-superforms/server';
import {z} from 'zod';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async ({locals}) => {
  const session = await locals.auth.validate();
  if (!session) throw redirect(302, '/connexion');
	const form = await superValidate(z.object({}));
  return {form, user: session.user};
};

export const actions: Actions = {
  signout: async ({locals}) => {
    const session = await locals.auth.validate();
    await signout(session);
    // eslint-disable-next-line unicorn/no-null
    locals.auth.setSession(null);
    throw redirect(302, '/connexion');
  },
};
