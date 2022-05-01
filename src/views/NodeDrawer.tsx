/* @refresh reload */
import { Component } from "solid-js";

const NodeDrawer: Component = () => {
  return (
    <div class="p-4 flex flex-col gap-2 overflow-auto">
      <h1 class="text-2xl">Node Drawer</h1>
      <div class="gap-4 grid auto-rows-fr">
        <div class="bg-surface-300 pt-full">a</div>
        <div class="bg-surface-300 pt-full"></div>
        <div class="bg-surface-300 pt-full"></div>
        <div class="bg-surface-300 pt-full"></div>
      </div>
    </div>
  );
};

export default NodeDrawer;
