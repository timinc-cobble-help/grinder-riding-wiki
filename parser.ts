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

// const wikiTableHeader = `{| class="wikitable sortable style="margin-left; 5px;"
// |+
// ! rowspan="3" | Dex No.
// ! rowspan="3" | Pokémon Name
// ! rowspan="3" | Land Ride Style
// ! rowspan="3" | Water Ride Style
// ! rowspan="3" | Air Ride Style
// ! colspan="15" | Ride Stats
// |-
// ! colspan="5" | Land
// ! colspan="5" | Water
// ! colspan="5" | Air
// |-
// ! Speed
// ! Accel.
// ! Skill
// ! Jump
// ! Stam.
// ! Speed
// ! Accel.
// ! Skill
// ! Jump
// ! Stam.
// ! Speed
// ! Accel.
// ! Skill
// ! Jump
// ! Stam.`;

function parseFromSpeciesFileToWikiTable(
  speciesFileContent: SpeciesFileContent
): string[] {
  const list: string[] = [];
  list.push(parseLine(speciesFileContent));
  return list;
}

function parseLine(speciesFileContent: SpeciesFileContent): string {
  const { name, nationalPokedexNumber, riding } = speciesFileContent;

  return `|-
<!-- Pokedex Number below --> 
| ${`${nationalPokedexNumber}`.padStart(3, "0")} 
<!-- Pokemon Name below --> 
| ${name} 
<!-- Land Style below. Leave as N/A if not applicable --> 
| ${
    riding?.behaviours?.LAND ? ridingStyles[riding.behaviours.LAND.key] : "N/A"
  } 
<!-- Water Style below. Leave as N/A if not applicable --> 
| ${
    riding?.behaviours?.LIQUID
      ? ridingStyles[riding.behaviours.LIQUID.key]
      : "N/A"
  } 
<!-- Air Style below. Leave as N/A if not applicable -->
| ${riding?.behaviours?.AIR ? ridingStyles[riding.behaviours.AIR.key] : "N/A"} 
<!-- Land Speed Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.LAND ? riding.behaviours.LAND.stats.SPEED : ""} 
<!-- Land Acceleration Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.LAND ? riding.behaviours.LAND.stats.ACCELERATION : ""} 
<!-- Land Skill Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.LAND ? riding.behaviours.LAND.stats.SKILL : ""} 
<!-- Land Jump Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.LAND ? riding.behaviours.LAND.stats.JUMP : ""} 
<!-- Land Stamina Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.LAND ? riding.behaviours.LAND.stats.STAMINA : ""} 
<!-- Water Speed Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.LIQUID ? riding.behaviours.LIQUID.stats.SPEED : ""} 
<!-- Water Acceleration Rating below. Leave blank if not applicable -->
| ${
    riding?.behaviours?.LIQUID
      ? riding.behaviours.LIQUID.stats.ACCELERATION
      : ""
  } 
<!-- Water Skill Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.LIQUID ? riding.behaviours.LIQUID.stats.SKILL : ""} 
<!-- Water Jump Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.LIQUID ? riding.behaviours.LIQUID.stats.JUMP : ""} 
<!-- Water Stamina Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.LIQUID ? riding.behaviours.LIQUID.stats.STAMINA : ""} 
<!-- Air Speed Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.AIR ? riding.behaviours.AIR.stats.SPEED : ""} 
<!-- Air Acceleration Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.AIR ? riding.behaviours.AIR.stats.ACCELERATION : ""} 
<!-- Air Skill Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.AIR ? riding.behaviours.AIR.stats.SKILL : ""} 
<!-- Air Jump Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.AIR ? riding.behaviours.AIR.stats.JUMP : ""} 
<!-- Air Stamina Rating below. Leave blank if not applicable -->
| ${riding?.behaviours?.AIR ? riding.behaviours.AIR.stats.STAMINA : ""}`.trim();
}

export default parseFromSpeciesFileToWikiTable;
