import { children, Component, createEffect, onCleanup } from "solid-js";
import split from "split.js";

export const Split: Component<
  {
    gutterClass?: string;
  } & Split.Options
> = (props) => {
  const c = children(() => props.children);

  createEffect(async () => {
    const children = c() as HTMLElement[];
    const { children: _, ...rest } = props;
    const inst = split([...children], {
      gutter: (index, direction) => {
        const gutter = document.createElement("div");
        gutter.className = props.gutterClass || `gutter gutter-${direction}`;
        return gutter;
      },
      ...rest,
    });
    onCleanup(() => inst.destroy());
  });

  return <>{c()}</>;
};
