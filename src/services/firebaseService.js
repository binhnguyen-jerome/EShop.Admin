// services/firebaseService.js
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import app from "../firebase";

export const storeImage = async (file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};
export const removeImage = async (url) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage(app);
    const imageRef = ref(storage, url);

    deleteObject(imageRef)
      .then(() => {
        console.log("Image deleted from Firebase");
        resolve(true);
      })
      .catch((error) => {
        console.error("Failed to delete image from Firebase:", error);
        reject(error);
      });
  });
};
