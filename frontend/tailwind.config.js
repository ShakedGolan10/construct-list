/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: [
        'bg-base-100',
        'text-base-content'
    ],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
        rtl: true,
        themes: ["autumn", "night"], // light: autumn, dark: night
        darkTheme: "night",
        base: true,
        styled: true,
        utils: true,
        prefix: "",
        themeRoot: ":root", // DaisyUI will attach theme variables to <html>
    },
};
