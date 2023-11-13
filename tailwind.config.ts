import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,md,svelte,ts}'],
	theme: {
		extend: {},
	},
	plugins: [typography, daisyui],
}