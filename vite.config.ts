import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import ViteFonts from "vite-plugin-fonts";
import InlineCSSModules from "vite-plugin-inline-css-modules";
import VitePluginInspect from "vite-plugin-inspect";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  publicDir: "./public",
  plugins: [
    VitePluginInspect(),
    InlineCSSModules({
      tagName: "css",
    }),
    ViteFonts({
      google: {
        families: [
          {
            name: "Roboto",
            styles: "ital,wght@0,400;1,200",
            defer: true,
          },
        ],
      },
    }),
    solidPlugin(),
    WindiCSS(),
    Icons({ compiler: "solid" }),
  ],
  build: {
    target: "esnext",
  },
});
