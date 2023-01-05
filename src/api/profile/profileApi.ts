import { getAuth, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { UpdateProfilePayload } from 'api/profile/types';
import { app, storage } from 'services/firebase';

const auth = getAuth(app);

export const profileApi = {
  async updateProfile({ displayName, photoFile }: UpdateProfilePayload) {
    if (auth.currentUser) {
      let photoURL;

      if (photoFile) {
        const photoURLRef = ref(
          storage,
          '/usersPhotoURL/OBGJ4RXExpUAhZbAaxahRR2FXUs2.jpg',
        );

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
};
