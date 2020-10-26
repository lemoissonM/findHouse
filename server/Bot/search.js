/* eslint-disable max-len */
import data, { getFormattedData } from './data';

const searchEntities = ['searchType', 'priceMin', 'priceMax', 'characteristics', 'near', 'address', 'location', 'quarter'];

const extractEntities = (psid, entities) => {
  const extractedEntities = {};
  Object.keys(entities).forEach((element) => {
    if (searchEntities.includes(element)) { extractedEntities[element] = entities[element].map((e) => e.value); }
  });
  return extractedEntities;
};

export default (entities, psid) => {
  const extracted = extractEntities(psid, entities);
  let houseArray = data;
  Object.keys(extracted).forEach((entityName) => {
    houseArray = houseArray.filter((house) => extracted[entityName]
      .map((eName) => eName.toLowerCase()).includes(house[entityName].toLowerCase()));
  });
  return getFormattedData(houseArray);
};
