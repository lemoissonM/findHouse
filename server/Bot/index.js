/* eslint-disable camelcase */
import search from './search';

export default ({ entities }, Psid) => {
  console.log(entities);
  if (entities.intent && entities.intent.length > 0) {
    switch (entities.intent[0].value) {
      case 'houseSearch':
        return search(entities, Psid);
      default:
        return [{ text: 'Je suis votre assistante pour trouver les maisons et parcels' }];
    }
  } else {
    return [{ text: 'jai pas pu comprendre votre requette, Je veux vous mettre en contact avec quelqu\'un pour qu\'il y reponde' }];
  }
};
