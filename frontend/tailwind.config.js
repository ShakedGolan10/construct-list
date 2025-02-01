/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

    theme: {
        extend: {},
    },

    plugins: [require("daisyui")],

    daisyui: {
        rtl: true,
        themes: ["autumn", "night"],
        darkTheme: "night",
        base: true,
        styled: true,
        utils: true,
        prefix: "",
        themeRoot: ":root", // The element that receives theme color CSS variables
    },
};
