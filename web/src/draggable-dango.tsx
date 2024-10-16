import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Dango } from "./types";

const DraggableDango = ({ dango }: { dango: Dango }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: dango.identifier(),
  });
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform) }}
      {...listeners}
      {...attributes}
    >
      <div
        className={`w-16 h-16 rounded-full border border-gray-600 ${dango.bgColor()}`}
      />
    </div>
  );
};

export default DraggableDango;
