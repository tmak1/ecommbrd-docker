import shippings from './data/shippings.js';

const getSampleShippings = (createdUsers) => {
  const sampleShippings = [
    { ...shippings[0], userId: createdUsers[0].id },
    { ...shippings[1], userId: createdUsers[1].id },
    { ...shippings[2], userId: createdUsers[2].id },
    { ...shippings[3], userId: createdUsers[3].id },
    { ...shippings[4], userId: createdUsers[4].id },
    { ...shippings[5], userId: createdUsers[5].id },
    { ...shippings[0], userId: createdUsers[0].id },
    { ...shippings[1], userId: createdUsers[1].id },
    { ...shippings[2], userId: createdUsers[2].id },
    { ...shippings[3], userId: createdUsers[3].id },
    { ...shippings[4], userId: createdUsers[4].id },
    { ...shippings[5], userId: createdUsers[5].id },
  ];
  return sampleShippings;
};

export default getSampleShippings;
