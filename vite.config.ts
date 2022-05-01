import transformerDirective from "@unocss/transformer-directives";
import UnocssPlugin from "@unocss/vite";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import filterReplace from "vite-plugin-filter-replace";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  publicDir: "./public",
  plugins: [
    solidPlugin(),
    UnocssPlugin({
      transformers: [transformerDirective()],
    }),
    Icons({ compiler: "solid" }),
    filterReplace([
      {
        filter: /\.css$/,
        replace: [
          (source: string, path: string) =>
            source.replaceAll(
              /(?<=--[a-z-0-9]+:[\s]+)rgb\(|(?<=--[a-z-0-9]+:[\s]+rgb\([0-9-a-z,\s]+)\)(?=;?)/gm,
              ""
            ),
        ],
      },
    ]),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
