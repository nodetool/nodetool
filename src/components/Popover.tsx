import {
  autoUpdate,
  computePosition,
  ComputePositionConfig,
  offset,
} from "@floating-ui/dom";
import {
  children,
  Component,
  createEffect,
  createSignal,
  JSX,
  on,
  onCleanup,
  Show,
} from "solid-js";
import Overlay from "./Overlay";

const Popover: Component<{
  activator: JSX.Element;
  placement?: ComputePositionConfig["placement"];
  offset?: number;
}> = (props) => {
  let container: HTMLDivElement | undefined = undefined;
  const [open, setOpen] = createSignal(false);
  const c = children(() => props.children);
  const a = children(() => props.activator);

  const update = async () => {
    const activator = a() as HTMLElement;
    const { x, y } = await computePosition(activator, container!, {
      placement: props.placement,
      middleware: [offset(props.offset)],
    });
    Object.assign(container!.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  createEffect(() => {
    console.log("meow");
    const activator = a() as HTMLElement;
    activator.addEventListener("click", () => setOpen(true));
  });

  createEffect(
    on(open, (value) => {
      if (!value) return;
      update();
      const cleanup = autoUpdate(a() as HTMLElement, container!, update);
      onCleanup(() => cleanup());
    })
  );

  return (
    <>
      {a()}
      <Show when={open()}>
        <Overlay onClick={() => setOpen(false)}>
          <div
            class="fixed"
            ref={container}
            onClick={(e) => e.stopPropagation()}
          >
            {c()}
          </div>
        </Overlay>
      </Show>
    </>
  );
};

export default Popover;
