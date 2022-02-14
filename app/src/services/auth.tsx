import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

import { IUser } from 'models';

export const onAuthStateChanged = (listener: (user: IUser | null) => void) => {
    const handleFirebaseAuthStateChanged = (firebaseUser: FirebaseAuthTypes.User | null): void => {
        if (!firebaseUser) {
            listener(null);
            return;
        }

        const user: IUser = {
            userId: firebaseUser.uid,
            name: firebaseUser.displayName,
            avatarImageUrl: firebaseUser.photoURL
        };

        listener(user);
    };

    const unsubscribe = auth().onAuthStateChanged(handleFirebaseAuthStateChanged);
    return unsubscribe;
};

export const loginWithFacebook = async (): Promise<void> => {
  const permissions = ['public_profile', 'email'];

  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(permissions);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  auth().signInWithCredential(facebookCredential);
}