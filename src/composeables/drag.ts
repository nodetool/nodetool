import {
  Draggable,
  Droppable,
  useDragDropContext,
} from "@thisbeyond/solid-dnd";

export const useDragEnd = (
  onEnd: (
    x: number,
    y: number,
    ev: {
      draggable: Draggable;
      droppable?: Droppable | null;
    }
  ) => void
) => {
  const [, { onDragEnd, onDragMove }] = useDragDropContext()!;

  let x = 0;
  let y = 0;

  onDragMove(({ draggable }) => {
    x = draggable.transform.x;
    y = draggable.transform.y;
  });

  onDragEnd((ev) => {
    // offset the x and y by the draggable's position on screen
    // because the onDragMove event just gives us the change from the
    // original position of the element.
    onEnd(x + ev.draggable.layout.x, y + ev.draggable.layout.y, ev);
  });
};
