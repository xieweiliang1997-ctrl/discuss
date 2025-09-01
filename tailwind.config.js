import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  images: {
    remotePatterns:[
      {
        hostname:'avatars.githubusercontent.com'
      }
    ]
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },

  // darkMode: "class",
  plugins: [heroui()],
  // experimental: {
  //   serverActions: true, // 启用 Server Actions
  // },
}

module.exports = config;