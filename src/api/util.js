import { storage } from "./init";

export const getImageFromURL = (imageURL) => {
  const imageRef = storage.refFromURL(imageURL);
  return imageRef.getDownloadURL();
};
