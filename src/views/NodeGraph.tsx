import * as d3 from "d3";
import { Component, onMount } from "solid-js";
import { Split } from "../components/Split";
import { useAppStore } from "../store/app";
import NodeDrawer from "./NodeDrawer";
import classes from "./NodeGraph.module.css";
const NodeGraph: Component = (props) => {
  const [store, setStore] = useAppStore();
  let sidebar: HTMLDivElement | undefined = undefined;
  let graph: SVGElement | undefined = undefined;
  let g: SVGGElement | undefined = undefined;
  let dots: SVGPatternElement | undefined = undefined;

  onMount(() => {
    const gridSize = 25;
    const gridDotSize = 3;
    const svg = d3.select(graph!);
    const content = d3.select(g!);
    const dotsSelection = d3.select(dots!);
    svg.call(
      d3.zoom<SVGElement, unknown>().on("zoom", (event) => {
        content.attr("transform", event.transform);
        // update grid
        dotsSelection
          .attr("x", event.transform.x)
          .attr("y", event.transform.y)
          .attr("width", gridSize * event.transform.k)
          .attr("height", gridSize * event.transform.k)
          .selectAll("rect")
          .attr("x", (gridSize * event.transform.k) / 2 - gridDotSize / 2)
          .attr("y", (gridSize * event.transform.k) / 2 - gridDotSize / 2)
          .attr("opacity", Math.min(event.transform.k, 1)); // Lower opacity as the pattern gets more dense.
      })
    );
  });

  return (
    <div class="w-full h-full relative flex">
      <Split gutterClass={classes.gutter} gutterSize={5} sizes={[20, 80]}>
        <NodeDrawer />
        <svg
          class="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          ref={graph}
        >
          <pattern
            ref={dots}
            id="dot-pattern"
            patternUnits="userSpaceOnUse"
            width="25"
            height="25"
          >
            <rect
              width="3"
              height="3"
              fill="#a4a4a450"
              x="11"
              y="11"
              opacity="1"
            ></rect>
          </pattern>
          <rect fill="url(#dot-pattern)" width="100%" height="100%"></rect>
          <g ref={g}></g>
        </svg>
      </Split>
    </div>
  );
};

export default NodeGraph;
