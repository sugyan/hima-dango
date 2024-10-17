import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { ALL_DANGOS } from "./constants";
import Hands, { ID_HANDS } from "./hands";
import Skewer from "./skewer";
import { Color, Dango } from "./types";

const DangoEditor = ({
  initState,
  onChanged,
}: {
  initState: Color[][];
  onChanged: (skewers: Dango[][]) => void;
}) => {
  const [skewers, setSkewers] = useState<Dango[][]>([[], [], []]);
  const [hands, setHands] = useState<Dango[]>(Object.values(ALL_DANGOS));
  // set initial state
  useEffect(() => {
    const skewers: Dango[][] = [[], [], []];
    const dangos = Object.values(ALL_DANGOS);
    initState.forEach((skewer, i) => {
      skewer.forEach((color) => {
        const index = dangos.findIndex((d) => d.color === color);
        if (index !== -1) {
          const dango = dangos.splice(index, 1)[0];
          skewers[i].push(dango);
        }
      });
    });
    setSkewers(skewers);
    setHands(dangos);
  }, [initState]);
  // notify parent component if skewers are changed
  useEffect(() => {
    onChanged(skewers);
  }, [onChanged, skewers]);
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (
      over === null ||
      (typeof over.id == "number" && skewers[over.id].length >= 3)
    ) {
      return;
    }
    const dango = ALL_DANGOS[active.id];
    // update skewers
    setSkewers(
      skewers.map((skewer, i) => {
        if (skewer.includes(dango)) {
          return i === over.id ? skewer : skewer.filter((d) => d !== dango);
        } else {
          return i === over.id ? [...skewer, dango] : skewer;
        }
      })
    );
    // update hands if necessary
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
      <div className="w-full h-80 sm:h-96 bg-white">
        <div className="flex flex-col items-center space-y-2 w-full justify-center">
          <div className="flex justify-center space-x-12 sm:space-x-16">
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
