import { default as key, default as Keymaster } from "keymaster";
import {
  Component,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { Portal } from "solid-js/web";
import Dialog from "./components/Dialog";
import { useAppStore } from "./store/app";

type IPaletteEntry = {
  name: string;
} & (
  | {
      handler: () => void;
    }
  | {
      subentries: IPaletteEntry[];
    }
);

const CommandPaletteEntry: Component<{
  entry: IPaletteEntry;
}> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false);

  return (
    <li class="p-4 hover:bg-primary-dark select-none cursor-pointer list-none">
      <p class="font-bold text-xl">Hiii</p>
      <p class="text-sm text-contrast text-opacity-80">Hiii</p>
      <Show when={isOpen}>
        <ul>
          {"subentries" in props.entry
            ? props.entry.subentries.map((entry) => (
                <CommandPaletteEntry entry={entry} />
              ))
            : undefined}
        </ul>
      </Show>
    </li>
  );
};

const CommandPaletteEntryList: Component<{
  entries: IPaletteEntry[];
}> = (props) => {
  return (
    <For each={props.entries}>
      {(entry) => <CommandPaletteEntry entry={entry} />}
    </For>
  );
};

export default function () {
  const [store, setStore] = useAppStore();
  const [index, setIndex] = createSignal(0);
  const open = () => store.commandPalette;

  const handlers: [string, Keymaster.KeyHandler][] = [
    ["ctrl+k", () => setStore.commandPalette.toggle()],
    ["esc", () => setStore.commandPalette.close()],
    ["up", () => open() && setIndex(index() - 1)],
    ["down", () => open() && setIndex(index() + 1)],
  ];

  const entries: IPaletteEntry[] = [
    {
      name: "themes",
      subentries: [
        { name: "light", handler: () => console.log("light") },
        { name: "vantablack", handler: () => console.log("vantablack") },
      ],
    },
  ];

  onMount(() => {
    handlers.forEach(([hotkey, handler]) =>
      key(hotkey, (ev, h) => {
        handler(ev, h);
        return false;
      })
    );

    onCleanup(() => {
      handlers.forEach(([hotkey]) => key.unbind(hotkey));
    });
  });

  return (
    <Portal>
      <Dialog
        noPadding
        open={store.commandPalette}
        close={() => setStore.commandPalette.close()}
      >
        <CommandPaletteEntryList entries={entries} />
      </Dialog>
    </Portal>
  );
}
