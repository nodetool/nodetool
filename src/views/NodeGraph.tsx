import * as d3 from "d3";
import { D3ZoomEvent } from "d3";
import { Component, createSignal, For, onMount } from "solid-js";
import { inlineCss as css } from "vite-plugin-inline-css-modules";
import { Split } from "../components/Split";
import { useDragEnd } from "../composeables/drag";
import { useAppStore } from "../store/app";
import { INodeInstance as INode, ParameterType } from "../store/nodes";
import { NodeComponent } from "./Node";
import NodeDrawer from "./NodeDrawer";

const classes = css`
  .gutter {
    @apply cursor-pointer bg-surface-200;
  }
`;

interface INodeGraphNode {
  x: number;
  y: number;
  width: number;
  height: number;
  node: INode;
}

const NodeGraph: Component = (props) => {
  const gridSize = 60;
  const gridDotSize = 5;
  const [store, setStore] = useAppStore();
  let graph: SVGSVGElement;
  let g: SVGGElement;
  let dots: SVGPatternElement;
  let graphZoom = 0,
    panX = 0,
    panY = 0;
  const [nodes, setNodes] = createSignal<INodeGraphNode[]>([]);

  useDragEnd((absX, absY, { draggable }) => {
    const { x: graphX, y: graphY } = graph!.getBoundingClientRect();
    const [x, y] = [
      (absX - graphX - panX) / graphZoom,
      (absY - graphY - panY) / graphZoom,
    ];
    const name = draggable.id;
    const nearestX = Math.floor(x / gridSize);
    const nearestY = Math.floor(y / gridSize);
    setNodes((nodes) => [
      ...nodes,
      {
        x: nearestX,
        y: nearestY,
        width: 3,
        height: 2,
        node: {
          name: draggable.id as string,
          inputs: [
            {
              name: "number 1",
              type: ParameterType.Number,
            },
            {
              name: "string 1",
              type: ParameterType.String,
            },
            {
              name: "node 1",
              type: ParameterType.Node,
            },
          ],
          outputs: [
            {
              name: "number 1",
              type: ParameterType.Number,
            },
          ],
        },
      },
    ]);
  });

  const onNodeMove = (idx: number, ev: MouseEvent) => {};

  onMount(() => {
    const svg = d3.select(graph!);
    const content = d3.select(g!);
    const dotsSelection = d3.select(dots!);
    let zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .on("zoom", ({ transform }: D3ZoomEvent<SVGSVGElement, unknown>) => {
        graphZoom = transform.k;
        panX = transform.x;
        panY = transform.y;
        content.attr("transform", transform.toString());
        // update grid
        dotsSelection
          .attr("x", transform.x)
          .attr("y", transform.y)
          .attr("width", gridSize * transform.k)
          .attr("height", gridSize * transform.k)
          .selectAll("rect")
          .attr("x", (gridSize * transform.k) / 2 - gridDotSize / 2)
          .attr("y", (gridSize * transform.k) / 2 - gridDotSize / 2)
          .attr("opacity", Math.min(transform.k, 1)); // Lower opacity as the pattern gets more dense.
      })
      .filter((ev: MouseEvent) => {
        return ev.button === 0 || ev.button === 1 || ev.type === "wheel";
      });
    svg.call(zoom);
    zoom.translateTo(svg, 0, 0);
  });

  return (
    <div class="w-full h-full relative flex">
      <Split
        gutterClass={classes.gutter}
        gutterSize={5}
        sizes={[20, 80]}
        maxSize={[500, Infinity]}
      >
        <NodeDrawer />
        <svg
          class="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          ref={graph!}
        >
          <pattern
            ref={dots!}
            id="dot-pattern"
            patternUnits="userSpaceOnUse"
            width={gridSize}
            height={gridSize}
          >
            <rect
              width={gridDotSize}
              height={gridDotSize}
              fill="#a4a4a450"
              x="11"
              y="11"
              opacity="1"
            ></rect>
          </pattern>
          <rect fill="url(#dot-pattern)" width="100%" height="100%"></rect>
          <g ref={g!}>
            <For each={nodes()}>
              {(node, i) => (
                <NodeComponent
                  node={node.node}
                  width={gridSize * node.width}
                  height={gridSize * node.height}
                  rx={2}
                  x={node.x * gridSize + gridSize / 2}
                  y={node.y * gridSize + gridSize / 2}
                  backgroundColor="var(--surface-400)"
                  handleColor="var(--secondary-light)"
                  onMouseMove={(ev) => onNodeMove(i(), ev)}
                  onDelete={() =>
                    setNodes((nodes) => {
                      nodes.splice(i(), 1);
                      return [...nodes];
                    })
                  }
                />
              )}
            </For>
          </g>
        </svg>
      </Split>
    </div>
  );
};

export default NodeGraph;
