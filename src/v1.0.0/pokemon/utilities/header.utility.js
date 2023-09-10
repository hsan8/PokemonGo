const keyToBeModified = {
  'Pokedex Number': 'PokedexNumber',
  'Img name': 'ImgName',
  'Evolution Stage': 'EvolutionStage',
  'Cross Gen': 'CrossGen',
  'Type 1': 'Type1',
  'Type 2': 'Type2',
  'Weather 1': 'Weather1',
  'Weather 2': 'Weather2',
  'STAT TOTAL': 'STAT_TOTAL',
  'Not-Gettable': 'NotGettable',
  'Future Evolve': 'FutureEvolve',
  '100% CP @ 40': 'CP100_40',
  '100% CP @ 39': 'CP100_39'
};

function adjustHeadersKeys(inputArray = []) {
  const transformedArray = inputArray.map((element) => {
    // Check if the element exists in the mapping
    if (keyToBeModified[element]) {
      // If it exists, return the corresponding value from the mapping
      return keyToBeModified[element];
    }
    // If it doesn't exist, return the element as is
    return element;
  });

  return transformedArray;
}

const objectKeys = [
  'Row',
  'Name',
  'PokedexNumber',
  'ImgName',
  'Generation',
  'EvolutionStage',
  'Evolved',
  'FamilyID',
  'CrossGen',
  'Type1',
  'Type2',
  'Weather1',
  'Weather2',
  'STAT_TOTAL',
  'ATK',
  'DEF',
  'STA',
  'Legendary',
  'Aquireable',
  'Spawns',
  'Regional',
  'Raidable',
  'Hatchable',
  'Shiny',
  'Nest',
  'New',
  'NotGettable',
  'FutureEvolve',
  'CP100_40',
  'CP100_39'
];
module.exports = { adjustHeadersKeys, objectKeys };
