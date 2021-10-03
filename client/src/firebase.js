import firebase from 'firebase/app';
import 'firebase/storage';

const initializeFirebase = async (token) => {
  try {
    if (!firebase.apps.length) {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/firebaseConfig`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const firebaseConfig = await res.json();
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
    return firebase;
  } catch (error) {
    console.log(error);
  }
};

export default initializeFirebase;

// const firebaseConfig = {
//   apiKey: 'secret',
//   authDomain: '<your-auth-domain>',
//   databaseURL: 'https://brdecomm-c1d32.firebaseio.com/images',
//   storageBucket: 'gs://brdecomm-c1d32.appspot.com',
// };
