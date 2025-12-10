import { getRandomArbitrary, fakeArray, generateRandomColors } from "./common";
import { COLORS } from "./constant";

describe("getRandomArbitrary", () => {
  it("should return a number between min and max (inclusive)", () => {
    const min = 5;
    const max = 10;

    for (let i = 0; i < 100; i++) {
      const result = getRandomArbitrary(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    }
  });

  it("should return an integer", () => {
    const result = getRandomArbitrary(1, 100);
    expect(Number.isInteger(result)).toBe(true);
  });

  it("should return min when min equals max", () => {
    const result = getRandomArbitrary(5, 5);
    expect(result).toBe(5);
  });

  it("should handle negative numbers", () => {
    const min = -10;
    const max = -5;

    for (let i = 0; i < 50; i++) {
      const result = getRandomArbitrary(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    }
  });
});

describe("fakeArray", () => {
  it("should create an array of specified length", () => {
    const result = fakeArray(5);
    expect(result).toHaveLength(5);
  });

  it("should contain numbers from 1 to length", () => {
    const result = fakeArray(5);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it("should return an empty array when length is 0", () => {
    const result = fakeArray(0);
    expect(result).toEqual([]);
  });

  it("should return [1] when length is 1", () => {
    const result = fakeArray(1);
    expect(result).toEqual([1]);
  });
});

describe("generateRandomColors", () => {
  it("should return an array of 5 colors", () => {
    const result = generateRandomColors();
    expect(result).toHaveLength(5);
  });

  it("should only contain valid colors from COLORS constant", () => {
    for (let i = 0; i < 50; i++) {
      const result = generateRandomColors();
      result.forEach((color) => {
        expect(COLORS).toContain(color);
      });
    }
  });

  it("should return strings", () => {
    const result = generateRandomColors();
    result.forEach((color) => {
      expect(typeof color).toBe("string");
    });
  });
});
