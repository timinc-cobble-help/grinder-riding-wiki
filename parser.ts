interface SpeciesFileContent {
  name: string;
  nationalPokedexNumber: number;
  riding?: {
    behaviours?: Record<
      (typeof ridingTypes)[number],
      {
        key: keyof typeof ridingStyles;
        stats: Record<(typeof statTypes)[number], string>;
      }
    >;
  };
  forms?: SpeciesFileContent[];
}

interface ParsedLine {
  dex: number;
  line: string;
  empty: boolean;
}

const ridingTypes = ["LAND", "AIR", "LIQUID"] as const;
const statTypes = [
  "SPEED",
  "ACCELERATION",
  "SKILL",
  "JUMP",
  "STAMINA",
] as const;

const ridingStyles = {
  "cobblemon:air/rocket": "Rocket",
  "cobblemon:air/jet": "Jet",
  "cobblemon:air/helicopter": "Helicopter",
  "cobblemon:air/glider": "Glider",
  "cobblemon:air/bird": "Bird",
  "cobblemon:air/ufo": "UFO",
  "cobblemon:air/airship": "Airship",
  "cobblemon:land/generic": "Generic",
  "cobblemon:land/horse": "Horse",
  "cobblemon:land/minekart": "Minecart",
  "cobblemon:land/vehicle": "Vehicle",
  "cobblemon:land/roll": "Roll",
  "cobblemon:liquid/boat": "Boat",
  "cobblemon:liquid/burst": "Burst",
  "cobblemon:liquid/dolphin": "Dolphin",
  "cobblemon:liquid/submarine": "Submarine",
  "cobblemon:composite/fall_to_flight": "Fall To Flight",
  "cobblemon:composite/run_up_to_flight": "Run Up To Flight",
} as const;

function parseFromSpeciesFileToWikiTable(
  speciesFileContent: SpeciesFileContent
): ParsedLine[] {
  const list: ParsedLine[] = [];
  list.push(parseLine(speciesFileContent));
  for (const form of speciesFileContent.forms ?? []) {
    const parsedFormLine = parseLine(form, speciesFileContent);
    console.log(
      `${speciesFileContent.name}|${form.name}|${parsedFormLine.empty}`
    );
    list.push(parsedFormLine);
  }
  return list;
}

function parseLine(
  formFileContent: SpeciesFileContent,
  speciesFileContent?: SpeciesFileContent
): ParsedLine {
  const { name, nationalPokedexNumber, riding } = formFileContent;

  const line = `|-
<!-- Pokedex Number below --> 
| ${`${
    nationalPokedexNumber || speciesFileContent?.nationalPokedexNumber
  }`.padStart(3, "0")} 
<!-- Pokemon Name below --> 
| ${
    speciesFileContent
      ? `${speciesFileContent.name} (${formFileContent.name})`
      : formFileContent.name
  } 
<!-- Land Style below. Leave as N/A if not applicable --> 
| ${
    riding?.behaviours?.LAND?.key
      ? ridingStyles[riding.behaviours.LAND.key]
      : speciesFileContent?.riding?.behaviours?.LAND?.key
      ? ridingStyles[speciesFileContent.riding.behaviours.LAND.key]
      : "N/A"
  } 
<!-- Water Style below. Leave as N/A if not applicable --> 
| ${
    riding?.behaviours?.LIQUID?.key
      ? ridingStyles[riding.behaviours.LIQUID.key]
      : speciesFileContent?.riding?.behaviours?.LIQUID?.key
      ? ridingStyles[speciesFileContent.riding.behaviours.LIQUID.key]
      : "N/A"
  } 
<!-- Air Style below. Leave as N/A if not applicable -->
| ${
    riding?.behaviours?.AIR?.key
      ? ridingStyles[riding.behaviours.AIR.key]
      : speciesFileContent?.riding?.behaviours?.AIR?.key
      ? ridingStyles[speciesFileContent.riding.behaviours.AIR.key]
      : "N/A"
  } 
<!-- Land Speed Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LAND?.stats?.SPEED ??
    speciesFileContent?.riding?.behaviours?.LAND?.stats?.SPEED ??
    ""
  } 
<!-- Land Acceleration Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LAND?.stats?.ACCELERATION ??
    speciesFileContent?.riding?.behaviours?.LAND?.stats?.ACCELERATION ??
    ""
  } 
<!-- Land Skill Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LAND?.stats?.SKILL ??
    speciesFileContent?.riding?.behaviours?.LAND?.stats?.SKILL ??
    ""
  } 
<!-- Land Jump Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LAND?.stats?.JUMP ??
    speciesFileContent?.riding?.behaviours?.LAND?.stats?.JUMP ??
    ""
  } 
<!-- Land Stamina Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LAND?.stats?.STAMINA ??
    speciesFileContent?.riding?.behaviours?.LAND?.stats?.STAMINA ??
    ""
  } 
<!-- Water Speed Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LIQUID?.stats?.SPEED ??
    speciesFileContent?.riding?.behaviours?.LIQUID?.stats?.SPEED ??
    ""
  } 
<!-- Water Acceleration Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LIQUID?.stats?.ACCELERATION ??
    speciesFileContent?.riding?.behaviours?.LIQUID?.stats?.ACCELERATION ??
    ""
  } 
<!-- Water Skill Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LIQUID?.stats?.SKILL ??
    speciesFileContent?.riding?.behaviours?.LIQUID?.stats?.SKILL ??
    ""
  } 
<!-- Water Jump Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LIQUID?.stats?.JUMP ??
    speciesFileContent?.riding?.behaviours?.LIQUID?.stats?.JUMP ??
    ""
  } 
<!-- Water Stamina Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LIQUID?.stats?.STAMINA ??
    speciesFileContent?.riding?.behaviours?.LIQUID?.stats?.STAMINA ??
    ""
  } 
<!-- Air Speed Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.AIR?.stats?.SPEED ??
    speciesFileContent?.riding?.behaviours?.AIR?.stats?.SPEED ??
    ""
  } 
<!-- Air Acceleration Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.AIR?.stats?.ACCELERATION ??
    speciesFileContent?.riding?.behaviours?.AIR?.stats?.ACCELERATION ??
    ""
  } 
<!-- Air Skill Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.AIR?.stats?.SKILL ??
    speciesFileContent?.riding?.behaviours?.AIR?.stats?.SKILL ??
    ""
  } 
<!-- Air Jump Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.AIR?.stats?.JUMP ??
    speciesFileContent?.riding?.behaviours?.AIR?.stats?.JUMP ??
    ""
  } 
<!-- Air Stamina Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.AIR?.stats?.STAMINA ??
    speciesFileContent?.riding?.behaviours?.AIR?.stats?.STAMINA ??
    ""
  }`.trim();

  return {
    dex: nationalPokedexNumber || speciesFileContent?.nationalPokedexNumber!!,
    line,
    empty: !riding?.behaviours && !speciesFileContent?.riding?.behaviours,
  };
}

export default parseFromSpeciesFileToWikiTable;
