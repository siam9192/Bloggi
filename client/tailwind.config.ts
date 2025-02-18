import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       primary_color:'rgb(26, 26, 29)',
       secondary_color:'rgb(216,242,118)'
          // secondary_color:'rgb(254,212,110)'
       
      },
      fontFamily:{
        jost:'"Jost", serif',
        poppins:'poppins,serif'
      }
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
