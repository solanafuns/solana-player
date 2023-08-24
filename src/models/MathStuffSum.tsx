import * as borsh from "borsh";

class MathStuffSquare {
  sum: number;

  constructor(fields: { sum: number } = { sum: 0 }) {
    this.sum = fields.sum;
  }
}

const schema = {
  struct: { sum: "u32" },
};

const MATH_STUFF_SIZE = borsh.serialize(schema, new MathStuffSquare()).length;

export { MathStuffSquare, MATH_STUFF_SIZE };
