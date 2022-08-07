import {
  Component,
  createSignal,
  For,
  JSX,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import { css } from "vite-plugin-inline-css-modules";

const classes = css`
  .node {
    @apply border border-1 border-primary-light active:bg-opacity-30 
      transition duration-100 relative w-full h-full;
  }
`;

const handles = {
  topLeft: [0, 0],
  top: [0.5, 0],
  topRight: [1, 0],
  left: [0, 0.5],
  bottomLeft: [0, 1],
  bottom: [0.5, 1],
  bottomRight: [1, 1],
  right: [1, 0.5],
};

export const DraggableSvgElement: Component<
  {
    onDrag?: (ev: MouseEvent) => void;
    handleColor?: string;
    overlayChildren?: JSX.Element;
  } & JSX.RectSVGAttributes<SVGSVGElement>
> = (props) => {
  let rootNode: SVGSVGElement;
  const [resizing, setResizing] = createSignal(false);
  let mouseDown = false;

  const onMouseHold = () => {
    if (!mouseDown) return;
    setResizing(true);
  };

  const clickOffHandler = () => {
    setResizing(false);
  };

  onMount(() => {
    window.addEventListener("click", clickOffHandler);
    onCleanup(() => window.removeEventListener("click", clickOffHandler));
  });

  return (
    <svg
      class="overflow-visible"
      {...props}
      pointer-events="all"
      ref={rootNode!}
      onPointerDown={(ev) => {
        ev.preventDefault();
        mouseDown = true;
        setTimeout(() => onMouseHold(), 500);
      }}
      onPointerUp={() => (mouseDown = false)}
      onClick={(ev) => ev.stopPropagation()}
    >
      <foreignObject width={props.width} height={props.height}>
        {props.children}
        <Show when={resizing()}>{props.overlayChildren}</Show>
      </foreignObject>
      <g class={resizing() ? "visible" : "hidden"}>
        <For each={Object.values(handles)}>
          {(handle) => (
            <circle
              cx={`${handle[0] * 100}%`}
              cy={`${handle[1] * 100}%`}
              r={6}
              fill={`rgba(${props.handleColor},0.8)`}
              onMouseDown={(ev) => ev.stopPropagation()}
            ></circle>
          )}
        </For>
      </g>
    </svg>
  );
};
