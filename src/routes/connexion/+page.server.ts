import {signin} from '$lib/server/utils';
import {zSignin} from '$lib/utils';
import {redirect} from '@sveltejs/kit';
import {message, superValidate} from 'sveltekit-superforms/server';
import type {Actions, PageServerLoad} from './$types';

export const load: PageServerLoad = async ({locals}) => {
  const session = await locals.auth.validate();
  if (session) throw redirect(302, '/');
  const form = await superValidate(zSignin);
  return {form};
};

export const actions: Actions = {
  default: async ({locals, request}) => {
    const form = await superValidate(request, zSignin);
    if (!form.valid) return message(form, 'Le formulaire est invalide.');
    const rSignin = await signin(form.data);
    if (!rSignin.success) return message(form, rSignin.error.message, {status:rSignin.error.status}) 
    locals.auth.setSession(rSignin.data);
    throw redirect(302, '/');
  },
};
