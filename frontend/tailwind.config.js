/** @type {import('tailwindcss').Config} */
const config = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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

export default config
