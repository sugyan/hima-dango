import { useDroppable } from "@dnd-kit/core";
import DraggableDango from "./draggable-dango";
import { Dango } from "./types";
import { ALL_DANGOS } from "./constants";

const Skewer = ({ id, dangos }: { id: number; dangos: Dango[] }) => {
  const { active, isOver, setNodeRef } = useDroppable({
    id,
  });
  const dango = active && ALL_DANGOS[active.id];
  const droppable =
    isOver && dangos.length < 3 && !(dango && dangos.includes(dango));
  const color = dango ? `${dango.bgColor()}/50` : "";
  return (
    <div ref={setNodeRef}>
      <div className="relative flex flex-col items-center m-4 mt-8">
        <div className="z-0 rounded-t w-1 h-48 sm:h-60 bg-gray-800"></div>
        {droppable && (
          <div
            className={`absolute top-${28 - 12 * dangos.length} sm:top-${
              36 - 16 * dangos.length
            } left-1/2 transform -translate-x-1/2`}
          >
            <div
              className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-dashed border-gray-400 ${color}`}
            />
          </div>
        )}
        {dangos.map((dango, i) => (
          <div
            key={i}
            className={`z-10 absolute top-${28 - 12 * i} sm:top-${
              36 - 16 * i
            } left-1/2 transform -translate-x-1/2`}
          >
            <DraggableDango dango={dango} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skewer;
