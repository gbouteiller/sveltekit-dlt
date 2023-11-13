<FormControl {field} {form} {label} let:id class={cEl}>
  <input
    {id}
    name={field}
    type="text"
    bind:value={$value}
    aria-invalid={$errors ? 'true' : undefined}
    class="input input-bordered{$errors ? ' input-error' : ''}"
    {...$constraints}
    {...$$restProps}
  />
</FormControl>

<script lang="ts" context="module">
  import type {AnyZodObject} from 'zod';
  type T = AnyZodObject;
</script>

<script lang="ts" generics="T extends AnyZodObject">
  import type {FormPathLeaves, ZodValidation} from 'sveltekit-superforms';
  import {formFieldProxy, type SuperForm} from 'sveltekit-superforms/client';
  import type {z} from 'zod';
  import FormControl from './control.svelte';

  // PROPS =================================================================================================================================
  export let field: FormPathLeaves<z.infer<T>>;
  export let form: SuperForm<ZodValidation<T>, unknown>;
  export let label: string;

  // VARS ==================================================================================================================================
  const {value, errors, constraints} = formFieldProxy(form, field);

  // STYLES ================================================================================================================================
  let cEl = '';
  export {cEl as class};
</script>
