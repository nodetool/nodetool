import { Component, For, JSX } from "solid-js";
import { inlineCss as css } from "vite-plugin-inline-css-modules";
import IconTrash from "~icons/carbon/trash-can";
import { DraggableSvgElement } from "../components/DraggableSvgElement";
import { INodeInstance, ParameterType } from "../store/nodes";

const ParameterColors: Record<number, string> = Object.freeze({
  [ParameterType.None]: "bg-white",
  [ParameterType.String]: "bg-green-400",
  [ParameterType.Number]: "bg-red-400",
  [ParameterType.Bool]: "bg-blue-400",
  [ParameterType.Node]: "bg-purple-400",
});

const classes = css`
  .node {
    @apply border border-1 border-primary-light active:bg-opacity-30 
      transition duration-100 relative w-full h-full flex flex-col;
  }

  .inputnodes {
    @apply bg-black w-min rounded-r-md py-1 pr-1 text-xs flex flex-col gap-1;
  }

  .inputnode {
    @apply rounded-r-full w-1 h-4 absolute top-1/2 transform -translate-y-1/2;
  }

  .outputnodes {
    @apply bg-black w-min rounded-l-md py-1 pl-1 text-xs flex flex-col gap-1;
  }

  .outputnode {
    @apply rounded-l-full w-1 h-4 absolute top-1/2 transform -translate-y-1/2 -right-0;
  }
`;

export const NodeComponent: Component<
  {
    handleColor: string;
    backgroundColor: string;
    onDrag?: (ev: MouseEvent) => void;
    onDelete?: () => void;
    node: INodeInstance;
  } & JSX.RectSVGAttributes<SVGSVGElement>
> = (props) => {
  return (
    <DraggableSvgElement
      {...props}
      overlayChildren={() => (
        <div class="absolute right-0 bottom-0 rounded-tl-md overflow-hidden">
          <div
            class="p-1 bg-surface-100 active:bg-surface-300 cursor-pointer"
            onClick={props.onDelete}
          >
            <IconTrash class="text-red-400" />
          </div>
        </div>
      )}
    >
      <div
        class={classes.node}
        style={{
          "background-color": `rgba(${props.backgroundColor}, var(--tw-bg-opacity))`,
        }}
      >
        <p class="p-2 bg-surface-300 w-full text-xs text-center">
          {props.node.name}
        </p>
        <div class="h-full w-full flex flex-col">
          <div class="flex justify-between items-center h-full">
            <div class={classes.inputnodes}>
              <For each={props.node.inputs}>
                {(input) => (
                  <div class="relative">
                    <div
                      class={`${classes.inputnode} ${
                        ParameterColors[input.type]
                      }`}
                    />
                    <span class="ml-2 whitespace-nowrap">{input.name}</span>
                  </div>
                )}
              </For>
            </div>
            <div class={classes.outputnodes}>
              <For each={props.node.outputs}>
                {(output) => (
                  <div class="relative">
                    <div
                      class={`${classes.outputnode} ${
                        ParameterColors[output.type]
                      }`}
                    />
                    <span class="mr-2 whitespace-nowrap">{output.name}</span>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>
    </DraggableSvgElement>
  );
};
