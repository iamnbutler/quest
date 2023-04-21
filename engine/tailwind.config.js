/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        'code': {
                            lineHeight: '1',
                        }
                    }
                }
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
