<section class="flex min-h-screen items-center justify-center">
  <div class="card card-bordered w-full max-w-md bg-neutral text-neutral-content shadow-md">
    <div class="card-body items-center gap-8 text-center">
      <h1 class="card-title">Bienvenue {fullname}</h1>
      <img src={user.avatar} sizes="(min-width: 548px) 448px, calc(100vw - 96px)" alt="Avatar" width={3888} height={5184} />
      <form method="post" action="?/signout" use:enhance>
        <button type="submit" class="btn btn-primary">Je me déconnecte</button>
      </form>
    </div>
  </div>
</section>

<script lang="ts">
  import {superForm} from 'sveltekit-superforms/client';
  import type {PageData} from './$types';

  export let data: PageData;

  $: ({user} = data);
  $: fullname = `${user.forename} ${user.surname.toUpperCase()}`;

  const form = superForm(data.form);
  const {enhance} = form;
</script>
