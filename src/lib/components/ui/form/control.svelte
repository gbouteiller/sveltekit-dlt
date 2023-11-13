<div class="form-control {cEl}">
  <label for={id} class="label">
    <span class="label-text{$errors ? ' text-error' : ''}">{label}</span>
  </label>
  <slot {id} />
  {#if $errors}<label for={id} class="label" transition:slide>
      <span class="label-text-alt text-error">{$errors}</span>
    </label>{/if}
</div>

<script lang="ts" context="module">
  import type {AnyZodObject} from 'zod';
  type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
  import {slide} from 'svelte/transition';
  import type {FormPathLeaves, ZodValidation} from 'sveltekit-superforms';
  import {formFieldProxy, type SuperForm} from 'sveltekit-superforms/client';
  import type {z} from 'zod';

  // PROPS =================================================================================================================================
  export let field: FormPathLeaves<z.infer<T>>;
  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let label: string;

  // VARS ==================================================================================================================================
  const {errors} = formFieldProxy(form, field);
  const {formId} = form;
  $: id = `${$formId}_${field}`;

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
</script>
