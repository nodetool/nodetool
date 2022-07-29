import { render } from "solid-js/web";
import "virtual:fonts.css";
import "virtual:windi.css";
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
