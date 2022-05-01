import { Component, createComputed } from "solid-js";
import CommandPalette from "./CommandPalette";
import { useAppStore } from "./store/app";
import NodeGraph from "./views/NodeGraph";

const App: Component = () => {
  const [store, setStore] = useAppStore();
  const stylesheet = document.getElementById(
    "theme-stylesheet"
  ) as HTMLLinkElement;

  createComputed(() => {
    stylesheet.href = `/themes/${store.theme}.css`;
  });

  return (
    <>
      <NodeGraph />
      <CommandPalette />
    </>
  );
};

export default App;
