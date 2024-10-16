import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { ALL_DANGOS } from "./constants";
import Hands, { ID_HANDS } from "./hands";
import Skewer from "./skewer";
import { Dango } from "./types";

const DangoEditor = () => {
  const dangos = Object.values(ALL_DANGOS);
  const [skewers, setSkewers] = useState<Dango[][]>([[], [], []]);
  const [hands, setHands] = useState<Dango[]>(dangos);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over === null) {
      return;
    }
    const dango = ALL_DANGOS[active.id];
    setSkewers(
      skewers.map((skewer, i) => {
        if (skewer.includes(dango)) {
          return i === over.id ? skewer : skewer.filter((d) => d !== dango);
        } else {
          return i === over.id ? [...skewer, dango] : skewer;
        }
      })
    );
    if (over.id === ID_HANDS) {
      if (!hands.includes(dango)) {
        setHands([...hands, dango].sort((a, b) => a.color - b.color));
      }
    } else {
      setHands(hands.filter((d) => d !== dango));
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="w-8/12 h-96 bg-white">
        <div className="flex flex-col items-center space-y-2 w-full justify-center">
          <div className="flex justify-center space-x-20">
            {skewers.map((skewer, i) => (
              <Skewer key={i} id={i} dangos={skewer} />
            ))}
          </div>
          <Hands hands={hands} />
        </div>
      </div>
    </DndContext>
  );
};

export default DangoEditor;
