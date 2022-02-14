import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

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
  await auth().signInWithCredential(facebookCredential);
};

export const loginWithGoogle = async (): Promise<void> => {
  const webClientId = '790401372464-gbpg02j0ep7pjp7te8tbfk297sa88bf6.apps.googleusercontent.com';
  GoogleSignin.configure({ webClientId });

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  await auth().signInWithCredential(googleCredential);
}

export const signOut = async (): Promise<void> => {
  await auth().signOut();
}