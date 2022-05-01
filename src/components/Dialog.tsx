import { Component, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import Overlay from "./Overlay";

const Dialog: Component<{
  open: boolean;
  close: () => void;
  noPadding?: boolean;
}> = (props) => {
  return (
    <Transition
      onEnter={(el, done) =>
        el
          .animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 50,
          })
          .finished.then(done)
      }
      onExit={(el, done) =>
        el
          .animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 50,
          })
          .finished.then(done)
      }
    >
      <Show when={props.open}>
        <Overlay center onClick={props.close}>
          <div
            class="bg-surface-300 max-w-md w-full relative m-auto rounded-md overflow-hidden"
            classList={{ "p-8": !props.noPadding }}
            onClick={(e) => e.stopPropagation()}
          >
            {props.children}
          </div>
        </Overlay>
      </Show>
    </Transition>
  );
};

export default Dialog;
