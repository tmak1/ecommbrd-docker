import products from './data/products.js';
import { getFileMetaData, firebaseUpload } from './seedHelpers.js';

const getSampleProducts = async (adminUserId) => {
  return await Promise.all(
    products.map(async (product) => {
      const { localFilePath, remoteFilePath } = getFileMetaData(product.name);
      const medialink = await firebaseUpload(localFilePath, remoteFilePath);
      return {
        ...product,
        imageUrl: medialink,
        creatorId: adminUserId,
      };
    })
  );
};

export default getSampleProducts;
