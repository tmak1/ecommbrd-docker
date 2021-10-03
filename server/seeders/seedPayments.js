import payments from './data/payments.js';

const getSamplePayments = (createdUsers) => {
  const samplePayments = [
    { ...payments[0], userId: createdUsers[0].id },
    { ...payments[0], userId: createdUsers[0].id },
    { ...payments[1], userId: createdUsers[1].id },
    { ...payments[2], userId: createdUsers[2].id },
    { ...payments[3], userId: createdUsers[3].id },
    { ...payments[4], userId: createdUsers[4].id },
    { ...payments[5], userId: createdUsers[5].id },
  ];
  return samplePayments;
};

export default getSamplePayments;
