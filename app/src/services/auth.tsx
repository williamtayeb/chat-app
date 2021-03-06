import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Retrieve web client id used to configure google sign in
// through .env file
import { GOOGLE_WEB_CLIENT_ID } from "react-native-dotenv";

import { User } from "models/types";

/**
 * Listen for changes in user auth state
 * @param listener Callback function that is invoked whenever
 * auth state changes
 * @returns An unsubscribe function to stop listening
 */
export const onAuthStateChanged = (listener: (user: User | null) => void) => {
    const handleFirebaseAuthStateChanged = (firebaseUser: FirebaseAuthTypes.User | null) => {
        if (!firebaseUser) {
            listener(null);
            return;
        }

        const user: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName,
            avatarImageUrl: firebaseUser.photoURL
        };

        listener(user);
    };

    const unsubscribe = auth().onAuthStateChanged(handleFirebaseAuthStateChanged);
    return unsubscribe;
};

export const loginWithFacebook = async () => {
  const permissions = ['public_profile', 'email'];

  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(permissions);

  if (result.isCancelled) {
    throw new Error("User cancelled the login process");
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw new Error("Something went wrong obtaining access token");
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  await auth().signInWithCredential(facebookCredential);
};

export const loginWithGoogle = async () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID
  });

  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  await auth().signInWithCredential(googleCredential);
}

export const signOut = async () => {
  await auth().signOut();
}

export const getCurrentUser = (): User => {
  const user = auth().currentUser;

  if (!user) {
    throw new Error("The current user state is invalid");
  }

  return {
    id: user.uid,
    name: user.displayName,
    avatarImageUrl: user.photoURL
  }
}