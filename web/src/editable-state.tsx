import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useCallback, useState } from "react";
import DangoEditor from "./dango-editor";
import { Color, Dango } from "./types";

const EditableState = () => {
  const [colors, setColors] = useState<Color[][]>([[], [], []]);
  const [fixedColors, setFixedColors] = useState<Color[][]>([[], [], []]);
  const [isOpen, setIsOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const onChanged = useCallback((skewers: Dango[][]) => {
    setIsValid(
      skewers.map((skewer) => skewer.length).reduce((a, b) => a + b) === 6
    );
    setColors(skewers.map((skewer) => skewer.map((dango) => dango.color)));
  }, []);
  const onOk = () => {
    setFixedColors(colors);
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={() => setIsOpen(true)}>button {fixedColors}</button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-lg mx-auto rounded-lg overflow-hidden border-2 border-gray-500">
              <DangoEditor initState={fixedColors} onChanged={onChanged} />
              <div className="bg-white flex justify-end gap-8 px-8 pt-2 pb-4">
                <button onClick={() => setIsOpen(false)}>Cancel</button>
                <button
                  onClick={onOk}
                  className={`${
                    isValid
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  } rounded px-4 py-2`}
                  disabled={!isValid}
                >
                  OK
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default EditableState;
