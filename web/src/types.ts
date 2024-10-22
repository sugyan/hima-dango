export const Color = {
  Green: 1,
  White: 2,
  Pink: 3,
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
      [Color.Pink]: "bg-pink-300",
    }[this.color];
  }
  equals(other: Dango) {
    return this.color === other.color && this.id === other.id;
  }
}
