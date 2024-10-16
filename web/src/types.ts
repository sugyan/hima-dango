export const Color = {
  Green: 0,
  White: 1,
  Red: 2,
} as const;
export type Color = (typeof Color)[keyof typeof Color];

export class Dango {
  constructor(public color: Color, public id: number) {}

  identifier() {
    return `${this.id}-${this.color}`;
  }
  bgColor() {
    return {
      [Color.Green]: "bg-green-400",
      [Color.White]: "bg-white",
      [Color.Red]: "bg-red-400",
    }[this.color];
  }
  equals(other: Dango) {
    return this.color === other.color && this.id === other.id;
  }
}
