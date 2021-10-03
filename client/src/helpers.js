export const sendRequest = async (
  url,
  method = 'GET',
  headers = {},
  body = null
) => {
  try {
    const response = await fetch(url, { method, headers, body });
    const data = await response.json();
    if (!response.ok) {
      throw data;
    }
    return { error: null, data };
  } catch (error) {
    console.log(error);
    const msg = error.stack
      ? error.message || 'An unknown error occured'
      : 'An unknown error occured';
    return { error: msg, data: null };
  }
};

export const capitalize = (item) => {
  const itemArray = Object.entries(item).map(([key, val]) => {
    if (key === 'id' || typeof val !== 'string') {
      return [key, val];
    }
    return [
      key,
      val.trim().slice(0, 1).toUpperCase().concat(val.trim().slice(1)),
    ];
  });
  const itemObj = Object.fromEntries(itemArray);
  return itemObj;
};

export const addressStringify = (shippingAddress) => {
  const { street, suburb, postcode, city, country } = shippingAddress;
  let shipping = { street, suburb, postcode, city, country };
  if (!shipping.suburb || shipping.suburb === '') {
    delete shipping.suburb;
  }
  shipping = Object.entries(shipping)
    .map(([key, val]) => val)
    .join(', ');

  return shipping;
};

export const paymentMethodStringify = (paymentMethod) => {
  const payment =
    ['MasterCard', 'VISA'][Math.floor(Math.random() * 2)] +
    ' xxxx xxxx xxxx ' +
    paymentMethod.cardNumber.toString().slice(-4);
  return payment;
};

export const formatFileName = (fileName) => {
  return fileName
    .trim()
    .split(/\s+/)
    .map((str) => str.toLowerCase())
    .join('_');
};

export const dateFormatter = (dateString) => {
  const dateObj = new Date(Date.parse(dateString));
  return dateObj.toLocaleDateString();
};
