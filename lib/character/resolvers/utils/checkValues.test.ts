import checkValues from "./checkValues";

describe("checkValues", () => {
  it("should throw name error", () => {
    expect(() => checkValues("", "Earth", ["A New Hope"])).toThrow(
      `Please provide a correct character name. The name  is to short.`,
    );
  });

  it("should throw planet error", () => {
    expect(() => checkValues("Olek", "", ["A New Hope"])).toThrow(
      `Please provide a correct planet name. The name  is to short.`,
    );
  });

  it("should throw episodes error", () => {
    expect(() => checkValues("Olek", "Earth", [])).toThrow(
      `Please provide a correct episodes title list. The ${[]} list is to short.`,
    );
  });

  it("should throw duplicate error", () => {
    expect(() =>
      checkValues("Olek", "Earth", ["A New Hope", "A New Hope"]),
    ).toThrow(`Please provide an episodes list without duplicates.`);
  });
});
