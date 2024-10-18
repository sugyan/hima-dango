import { useEffect, useRef } from "react";
import { Color } from "./types";

const DangoViewer = ({ colors }: { colors: Color[][] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctx = canvasRef.current!.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 400, 300);
    // draw skewers
    ctx.fillStyle = "#000000";
    [100, 200, 300].forEach((x) => {
      ctx.beginPath();
      ctx.roundRect(x - 2, 20, 4, 260, 4);
      ctx.fill();
    });
    // draw dangos
    ctx.strokeStyle = "#9ca3af";
    ctx.lineWidth = 1.5;
    colors.forEach((skewer, i) => {
      skewer.forEach((color, j) => {
        ctx.beginPath();
        ctx.fillStyle = {
          [Color.Green]: "#4ade80",
          [Color.White]: "#ffffff",
          [Color.Pink]: "#f9a8d4",
        }[color];
        ctx.arc(100 * i + 100, 165 - 70 * j + 50, 35, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
      });
    });
  }, [colors]);
  return (
    <div className="rounded overflow-hidden">
      <canvas ref={canvasRef} width="400" height="300" className="w-full" />
    </div>
  );
};
export default DangoViewer;
