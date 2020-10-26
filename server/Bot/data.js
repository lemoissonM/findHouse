const data = [
  {
    searchType: 'location',
    price: 165,
    characteristics: 'electricity,water',
    near: 'mosque',
    address: 'birere, 14',
    location: 'goma',
    quarter: 'birere',
    image: 'https://www.imcongo.com/dpics/annonces/626/2013-08-10-08-47-59_SAM_2391.JPG',
    imageDetails: [{ url: 'https://hirshfields.files.wordpress.com/2011/10/a_-living-room-1_nopillow_v6_arch.jpg', title: 'Salon' }, { url: 'https://hirshfields.files.wordpress.com/2011/10/a_-living-room-1_nopillow_v6_arch.jpg', title: 'Chambre 1' }],
    name: 'Maison a Mongafula',
    id: 1,
    chambers: 5,
    livingRooms: 2,
    detail: 'Maison en dur, a cote de la route ',
    latlong: '-1.6714097,29.2255475',
  },
  {
    searchType: 'location',
    price: 150,
    characteristics: 'electricity,water,principalRoad',
    near: 'mosque',
    address: 'mabanga, 14',
    location: 'goma',
    quarter: 'mabanga',
    image: 'https://fusionstoragelive.blob.core.windows.net/images/Listing/Office,800609/Photos,26219/pic_26219225_640x480.jpg',
    imageDetails: [{ url: 'https://hirshfields.files.wordpress.com/2011/10/a_-living-room-1_nopillow_v6_arch.jpg', title: 'Salon' }, { url: 'https://hirshfields.files.wordpress.com/2011/10/a_-living-room-1_nopillow_v6_arch.jpg', title: 'Chambre 1' }],
    name: 'Maison a Matete',
    id: 2,
    chambers: 5,
    livingRooms: 2,
    detail: 'Maison en dur, a cote de la route',
    latlong: '-1.6714097,29.2255475',
  },
  {
    searchType: 'buy',
    price: 1500,
    characteristics: 'electricity,water,principalRoad',
    near: 'mosque',
    address: 'mabanga, 14',
    location: 'goma',
    quarter: 'mabanga',
    image: 'https://imgur.com/g4nfXbB',
    imageDetails: [{ url: 'https://hirshfields.files.wordpress.com/2011/10/a_-living-room-1_nopillow_v6_arch.jpg', title: 'Salon' }, { url: 'https://hirshfields.files.wordpress.com/2011/10/a_-living-room-1_nopillow_v6_arch.jpg', title: 'Chambre 1' }],
    name: 'Maison a Motete',
    id: 3,
    chambers: 5,
    livingRooms: 2,
    detail: 'Maison en dur, a cote de la route',
    latlong: '-1.6714097,29.2255475',
  },
];

export const getFormattedData = (houses) => [
  {
    text: `J'ai touver ${houses.length} maisons qui correspondent a votre requettes`,
  },
  {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: houses.map((item) => ({
          title: `${item.name}, ${item.price} usd /moi`,
          image_url: item.image,
          subtitle: `Addresse : ${item.address}, ${item.location}`,
          buttons: [
            {
              type: 'postback',
              title: 'VOIR LES DETAILS',
              payload: JSON.stringify({
                name: item.id,
                action: 'house.detail',
              }),
            }, {
              type: 'postback',
              title: 'VISITER',
              payload: JSON.stringify({
                name: item.id,
                action: 'house.visit',
              }),
            }],
        })),
      },
    },
  },
];

export const getDetails = (houseId) => {
  const house = data.find((e) => e.id === houseId);
  return [
    {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: house.imageDetails.map((item) => ({
            title: item.title,
            image_url: item.url,
            default_action: {
              type: 'web_url',
              url: item.url,
              webview_height_ratio: 'tall',
            },
          })),
        },
      },
    },
    {
      text: `${house.detail} avec ${house.livingRooms} salon(s) et ${house.chambers} chambres, Voici les images de la maison ☝☝. Voulez-vous visiter cette maison ?`,
      quick_replies: [{
        content_type: 'text',
        title: 'Visiter la maison',
        payload: JSON.stringify({ id: houseId, type: 'visit' }),
      }],
    },
  ];
};

export const getMapImage = (houseId) => {
  const house = data.find((e) => e.id === houseId);
  return [
    {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [{
            title: 'Voici le map de la maison',
            image_url: `https://maps.googleapis.com/maps/api/staticmap?center=${house.latlong}&markers=color:red%7Clabel:M%7C${house.latlong}&zoom=16&size=800x800&key=${process.env.googleApiKey}`,
            default_action: {
              type: 'web_url',
              url: `https://maps.googleapis.com/maps/api/staticmap?center=${house.latlong}&markers=color:red%7Clabel:M%7C${house.latlong}&zoom=16&size=800x800&key=${process.env.googleApiKey}`,
              webview_height_ratio: 'tall',
            },
          }],
        },
      },
    }, {
      text: 'Voulez-vous qu on vous mettes en contact avec un agent, pour qu\'il vous fasse vister ',
      quick_replies: [{
        content_type: 'text',
        title: 'Oui',
        payload: houseId,
      },
      {
        content_type: 'text',
        title: 'Non',
        payload: houseId,
      }],
    }];
};

export default data;
