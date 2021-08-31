import checkName from "./checkName";

const dynamoCharacters = [
  {
    id: "Id",
    name: "Olek",
    episodes: ["A New Hope"],
    planet: "Earth",
  },
];

describe("checkName", () => {
  it("should throw credential error", () => {
    expect(() => checkName(dynamoCharacters)).toThrow(
      `Something wrong with your credentials..`,
    );
  });
});
