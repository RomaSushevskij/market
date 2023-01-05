import {
  getAuth,
  updateProfile,
  updateEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { UpdateProfilePayload } from 'api/profile/types';
import { app, storage } from 'services/firebase';

const auth = getAuth(app);

export const profileApi = {
  async updateProfile({ displayName, photoFile, imageName }: UpdateProfilePayload) {
    if (auth.currentUser) {
      let photoURL;

      if (photoFile) {
        const photoFileLocation = `/usersPhotoURL/${imageName}`;
        const photoURLRef = ref(storage, photoFileLocation);

        await uploadBytes(photoURLRef, photoFile);
        photoURL = await getDownloadURL(photoURLRef);
      }
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      return photoURL;
    }
  },
  async updateEmail(newEmail: string) {
    if (auth.currentUser) {
      await updateEmail(auth.currentUser, newEmail);
      await sendEmailVerification(auth.currentUser);
    }
  },
};
