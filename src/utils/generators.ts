import { PASSWORD_CHARACTERS } from "../constants/constants";

function generateRandomCharacter(characters: string): string {
  return characters[Math.floor(Math.random() * characters.length)];
}

export function generateRandomPassword(length = 10): string {
  const characters = Object.values(PASSWORD_CHARACTERS);

  const blocks = characters.map((characterBlock) =>
    Array.from({ length: Math.ceil(length / 4) }, () =>
      generateRandomCharacter(characterBlock),
    ),
  );

  return blocks.flatMap((block) => block).join("");
}
