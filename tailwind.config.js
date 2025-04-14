import flowbitePlugin from 'flowbite/plugin'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
    darkMode: 'selector',
    safelist: [
        {
            pattern: /z-(100|90|80|70|60|50|40|30|20|10|0)/,
        },
    ],
    theme: {
        extend: {
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
            },
            backgroundImage: {
                'backdrop': "url('$lib/images/backdrop.png')",
                'bottom-backdrop': "url('$lib/images/backdropBottom.png')",
            },
            colors: {
                // flowbite colors, we can of course add more colors here or change the basic theme by using a colour scheme
                primary: {
                    50: '#FFF5F2',
                    100: '#FFF1EE',
                    200: '#FFE4DE',
                    300: '#FFD5CC',
                    400: '#FFBCAD',
                    500: '#FE795D',
                    600: '#EF562F',
                    700: '#EB4F27',
                    800: '#CC4522',
                    900: '#A5371B'
                },
                'blue-whale': "#003249",
                'picton-blue': "#36D1FE",
                aquamarine: "#70F5E3",
                start: "#003249",
                gradient_end: "#36D1FE"
            }
        },
    },
    plugins: [flowbitePlugin],
}

