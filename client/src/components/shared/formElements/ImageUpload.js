import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

import initializeFirebase from '../../../firebase';
import { formatFileName } from '../../../helpers';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  btn: {
    height: '45px',
    padding: '10px',
    backgroundColor: theme.palette.primary.dark,
    fontSize: '14px',
    fontWeight: '700',
    borderRadius: '0',
    color: '#fff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  previewBox: {
    margin: '0 auto',
    '&>img': {
      width: '250px',
      height: '250px',
    },
  },
}));

const ImageUpload = forwardRef(({ token }, ref) => {
  const classes = useStyles();
  const filePickRef = useRef();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (event) => {
    if (event.target.files && event.target.files.length === 1) {
      setFile(event.target.files[0]);
    }
  };

  const upload = (uploadTask, ref) => {
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          reject(error);
        },
        () =>
          ref.getDownloadURL().then((url) => {
            resolve(url);
          })
      );
    });
  };

  const handleUpload = async (productName) => {
    if (file) {
      const firebase = await initializeFirebase(token);
      setPreviewUrl(null);
      const fileName = formatFileName(productName);
      const ref = firebase.storage().ref(`/products/images/${fileName}.jpg`);
      const uploadTask = ref.put(file);
      const url = await upload(uploadTask, ref);
      return url;
    }
  };

  useImperativeHandle(ref, () => ({
    handleUpload: handleUpload,
  }));

  useEffect(() => {
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={filePickRef}
        accept=".jpg, .jpeg, .png"
        onChange={handleChange}
      />
      <div className={classes.previewBox}>
        <img src={previewUrl || '/images/placeholder.jpg'} alt="Preview" />
      </div>
      <Button
        variant="contained"
        disableElevation
        className={classes.btn}
        onClick={() => filePickRef.current.click()}
      >
        Choose Image
      </Button>
    </div>
  );
});

export default ImageUpload;
