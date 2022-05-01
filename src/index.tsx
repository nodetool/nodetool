import "@unocss/reset/tailwind.css";
import { render } from "solid-js/web";
import "uno.css";
import App from "./App";
import "./index.css";
import { AppStateProvider } from "./store/app";

render(
  () => (
    <AppStateProvider>
      <App />
    </AppStateProvider>
  ),
  document.getElementById("root") as HTMLElement
);
