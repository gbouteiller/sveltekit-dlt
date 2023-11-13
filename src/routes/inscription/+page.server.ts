import {signup} from '$lib/server/utils';
import {zSignup} from '$lib/utils';
import {redirect} from '@sveltejs/kit';
import {message, superValidate} from 'sveltekit-superforms/server';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async ({locals}) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, '/');
  const form = await superValidate(zSignup);
  return {form};
};

export const actions: Actions = {
  default: async ({locals, request}) => {
    const form = await superValidate(request, zSignup);
    if (!form.valid) return message(form, 'Le formulaire est invalide.');
    const rSignup = await signup(form.data);
    if (!rSignup.success) return message(form, rSignup.error.message, {status: rSignup.error.status});
    locals.auth.setSession(rSignup.data);
    throw redirect(302, '/');
  },
};
