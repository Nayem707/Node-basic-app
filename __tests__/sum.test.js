// A simple function to test (or import your own)
import { sum } from "../src/dummy/sum.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
