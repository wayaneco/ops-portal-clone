import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-select/dist/index.esm.js",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        "primary-500": "#006F66",
        "primary-600": "#01554e",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("flowbite/plugin"), flowbite.plugin()],
};
export default config;
