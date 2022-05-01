import { Component, JSX } from "solid-js";

const Overlay: Component<
  { center?: boolean } & JSX.HTMLAttributes<HTMLDivElement>
> = (props) => {
  return (
    <div
      class="fixed inset-0 flex bg-contrast bg-opacity-01 absolute top-0 left-0"
      classList={{ "grid place-content-center": props.center }}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default Overlay;
