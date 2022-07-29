import { Component, JSX } from "solid-js";
import { inlineCss as css } from "vite-plugin-inline-css-modules";

const classes = css`
  .overlay {
    @apply fixed inset-0 flex bg-contrast bg-opacity-01 absolute top-0 left-0;
  }
`;

const Overlay: Component<
  { center?: boolean } & JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return (
    <div
      class={classes.overlay}
      classList={{ "grid place-content-center": props.center }}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default Overlay;
