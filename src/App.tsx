import {
  DragDropProvider,
  DragDropSensors,
  DragOverlay,
} from "@thisbeyond/solid-dnd";
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
    <DragDropProvider>
      <DragDropSensors />
      <NodeGraph />
      <CommandPalette />
      <DragOverlay>
        <div class="bg-primary-base bg-opacity-20 h-full w-full border-2 border-primary-light rounded-md shadow-primary-light/20 shadow-lg"></div>
      </DragOverlay>
    </DragDropProvider>
  );
};

export default App;
