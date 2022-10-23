/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{html,js}',
		'./node_modules/tw-elements/dist/js/**/*.js'
	],

	theme: {
		container: {
			center: true,

			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem'
			}
		},
		extend: {
			animation: {
				fadeIn: 'fadeIn 2s 1'
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: 0 },
					'50%': { opacity: 0.8 }
				}
			}
		}
	},
	plugins: [require('tw-elements/dist/plugin')]
};
