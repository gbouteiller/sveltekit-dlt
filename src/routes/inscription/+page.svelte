<section class="flex min-h-screen items-center justify-center">
  <div class="card card-bordered w-full max-w-md bg-neutral text-neutral-content shadow-md">
    <div class="card-body items-center text-center">
      <h1 class="card-title">Inscription</h1>
      {#if $message}<div class="alert alert-error" transition:slide>{$message}</div>{/if}
      <form method="post" use:enhance novalidate class="flex w-full flex-col gap-1">
        <Text {form} field="forename" label="Prénom" />
        <Text {form} field="surname" label="Nom" />
        <Url {form} field="avatar" label="Avatar" />
        <Email {form} field="email" label="Courriel" />
        <Password {form} field="password" label="Mot de passe" />
        <button type="submit" class="btn btn-primary mt-8">Je m'inscris</button>
      </form>
      <a href="/connexion" class="btn btn-link self-end px-0">Je me connecte</a>
    </div>
  </div>
</section>

<script lang="ts">
  import Email from '$lib/components/ui/form/email.svelte';
  import Password from '$lib/components/ui/form/password.svelte';
  import Text from '$lib/components/ui/form/text.svelte';
  import Url from '$lib/components/ui/form/url.svelte';
  import {zSignup} from '$lib/utils';
  import {slide} from 'svelte/transition';
  import {superForm} from 'sveltekit-superforms/client';
  import type {PageData} from './$types';

  export let data: PageData;

  const form = superForm(data.form, {validators: zSignup, taintedMessage: undefined});
  const {enhance, message} = form;
</script>
