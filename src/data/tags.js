export const TAGS = [
  {
    id: 1,
    title: "undead",
    class: "creatureCategory",
    definition: "Rampaging horde",
    properties: {
      race: ["undead", 10],
      abilities: ["theurgy", 0]
    }
  },
  {
    id: 2,
    title: "Powerful",
    class: "ChallengeRating",
    definition: "The second most difficult challenge possible",
    properties: {
      experience: 600
    }
  },
  {
    id: 3,
    title: "archer",
    class: "Occupation",
    synonyms: "bowman",
    definition: "Uses a bow or cross bow",
    properties: {
      occupation: [["archer", 10]],
      weapon: [["bow", 10], ["crossbow", 10]],
      attributes: [["accuracy", 10], ["quick", 7], ["vigilant", 7]]
    }
  }
];
