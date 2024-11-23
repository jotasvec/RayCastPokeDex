// Colors.tsx

export const Colors = {
    fire: "#ff7402",
    grass: "#9bcc50",
    steel: "#9eb7b8",
    water: "#4592c4",
    psychic: "#f366b9",
    ground: "#ab9842",
    ice: "#51c4e7",
    flying: "#3dc7ef",
    ghost: "#4d5b64",
    normal: "#a4acaf",
    poison: "#7e0058",
    rock: "#a38c21",
    fighting: "#d56723",
    dark: "#707070",
    bug: "#729f3f",
    dragon: "linear-gradient(180deg, #53a4cf 50%, #f16e57 50%)",
    electric: "#bba909",
    fairy: "#fdb9e9",
    shadow: "#7b62a3",
    unknow: "#757575",
    
    primary: "#006d77",
    primaryHover: "#83c5be"
  } as const;

  type colorName = keyof typeof Colors

  /**
 * Function to retrieve color code by name.
 * @param colorName The name of the color, as received from the API.
 * @returns The color code (string), or a default color if not found.
 */

  export function getColorByName(colorName: string): string{
    const colorKey = colorName.toLowerCase() as colorName;

    return Colors[colorKey] ?? Colors.unknow;
  }