import { Component, createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

function tuple<T extends any[]>(...elements: T) {
  return elements;
}

export interface IAppState {
  theme: string;
  commandPalette: boolean;
}

const newAppStore = () => {
  const [store, setStore] = createStore<IAppState>({
    commandPalette: false,
    theme: localStorage.getItem("theme") || "vantablack",
  });

  return tuple(store, {
    commandPalette: {
      toggle() {
        setStore({ commandPalette: !store.commandPalette });
      },
      close() {
        setStore({ commandPalette: false });
      },
    },
  });
};

const AppStateContext = createContext<ReturnType<typeof newAppStore>>();

export const AppStateProvider: Component = (props) => {
  const store = newAppStore();
  return (
    <AppStateContext.Provider value={store}>
      {props.children}
    </AppStateContext.Provider>
  );
};

// never can be undefined unless you are user error (you didn't do dependency injection)
export const useAppStore = () => useContext(AppStateContext)!;
