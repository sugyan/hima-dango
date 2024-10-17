import { useDroppable } from "@dnd-kit/core";
import DraggableDango from "./draggable-dango";
import { Dango } from "./types";

export const ID_HANDS = "hand";

const Hands = ({ hands }: { hands: Dango[] }) => {
  const { setNodeRef } = useDroppable({
    id: ID_HANDS,
  });
  return (
    <div
      ref={setNodeRef}
      className="w-72 h-12 sm:w-96 sm:h-16 flex rounded-lg outline-2 outline-dotted outline-gray-500"
    >
      {hands.map((dango, i) => (
        <div key={i}>
          <DraggableDango dango={dango} />
        </div>
      ))}
    </div>
  );
};

export default Hands;
