/* @refresh reload */
import { createSet } from "@solid-primitives/set";
import { createDraggable } from "@thisbeyond/solid-dnd";
import { Component, createSignal, For, onMount } from "solid-js";
import { inlineCss as css } from "vite-plugin-inline-css-modules";
import { Shimmer } from "../components/Shimmer";
import { INodeEntry, nodes, tags } from "../store/nodes";

const classes = css`
  .add-list-item {
    @apply cursor-pointer hover:bg-primary-base p-3 bg-surface-200 rounded-lg;
  }

  .drawer-xs > .node-list {
    @apply grid-cols-1;
  }

  .drawer-sm > .node-list {
    @apply grid-cols-2;
  }

  .drawer-md > .node-list {
    @apply grid-cols-3;
  }

  .drawer-lg > .node-list {
    @apply grid-cols-4;
  }

  .node-element {
    aspect-ratio: 1;
    @apply bg-surface-400 rounded-md cursor-pointer hover:bg-primary-dark relative shadow-primary-light/10 hover:shadow-xl transition-colors duration-100 hover:-translate-y-0.2 active:translate-y-0 select-none;
    @apply flex flex-col gap-2 justify-center items-center;
  }

  .chip {
    @apply bg-surface-100 border-2 border-surface-300/50 w-min p-1 px-2 rounded-full select-none cursor-pointer bg-opacity-10 transition duration-100 hover:bg-surface-300;

    &.active {
      @apply bg-primary-base;
    }
  }
`;

const breakpoints: Record<string, number> = {
  xs: 200,
  sm: 300,
  md: 400,
  lg: 500,
};

const Node: Component<{ entry: INodeEntry }> = (props) => {
  const Icon = props.entry.icon;
  const draggable = createDraggable(props.entry.name);

  return (
    <Shimmer opacity={0.3}>
      <div class={classes["node-element"]} use:draggable>
        <Icon class="text-2xl" />
        <p class="font-bold text-xs mt-1">{props.entry.name}</p>
      </div>
    </Shimmer>
  );
};

const NodeDrawer: Component = () => {
  let container: HTMLDivElement | undefined = undefined;
  const filters = createSet<typeof tags[number]>();
  const [search, setSearch] = createSignal("");
  const visibleNodes = () => {
    let filtered = nodes;
    const searchTerm = search();
    if (searchTerm) {
      filtered = filtered.filter((node) =>
        node.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filters().length > 0) {
      filtered = filtered.filter((node) =>
        node.tags.some((tag) => filters.has(tag))
      );
    }
    return filtered;
  };

  onMount(() => {
    new ResizeObserver(() => {
      const w = container!.clientWidth;
      const breakpoint = (Object.entries(breakpoints).find(
        ([key, value]) => w < value
      )! || breakpoints["lg"])[0];
      container?.classList.add(classes[`drawer-${breakpoint}`]);
      container?.classList.remove(
        ...Object.keys(breakpoints)
          .filter((v) => v !== breakpoint)
          .map((v) => classes[`drawer-${v}`])
      );
    }).observe(container!);
  });

  return (
    <div class="p-4 flex flex-col gap-2 overflow-y-auto" ref={container}>
      <h1 class="text-lg">Node Drawer</h1>
      <input
        class="bg-surface-300 rounded-lg p-2 focus:outline outline-blue-300 focus:bg-surface-400 transition duration-100"
        placeholder="Search Nodes..."
        value={search()}
        onInput={(e) => setSearch(e.currentTarget.value)}
      />
      <div class="flex gap-2 text-sm flex-wrap">
        <For each={tags}>
          {(tag) => (
            <div
              class={classes.chip}
              classList={{ [classes["active"]]: filters.has(tag) }}
              onClick={() =>
                filters.has(tag) ? filters.delete(tag) : filters.add(tag)
              }
            >
              {tag}
            </div>
          )}
        </For>
      </div>
      <div class={`gap-3 grid ${classes["node-list"]}`}>
        <For each={visibleNodes()}>{(entry) => <Node entry={entry} />}</For>
      </div>
    </div>
  );
};

export default NodeDrawer;
