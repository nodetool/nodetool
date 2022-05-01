import { presetUno } from "@unocss/preset-uno";
import { defineConfig } from "@unocss/vite";

export default defineConfig({
  presets: [presetUno()],
  theme: {
    colors: {
      primary: {
        base: "rgb(var(--primary-base))",
        dark: "rgb(var(--primary-dark))",
        light: "rgb(var(--primary-light))",
      },
      accent: {
        base: "rgb(var(--accent-base))",
        dark: "rgb(var(--accent-dark))",
        light: "rgb(var(--accent-light))",
      },
      surface: {
        100: "rgb(var(--surface-100))",
        200: "rgb(var(--surface-200))",
        300: "rgb(var(--surface-300))",
        400: "rgb(var(--surface-400))",
        500: "rgb(var(--surface-500))",
        600: "rgb(var(--surface-600))",
      },
      contrast: "rgb(var(--contrast))",
    },
  },
});
