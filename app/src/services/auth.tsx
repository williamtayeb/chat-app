import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { IUser } from 'models';

const DEFAULT_USER_NAME = 'Anonymous';

export const onAuthStateChanged = (listener: (user: IUser | null) => void) => {
    const handleFirebaseAuthStateChanged = (firebaseUser: FirebaseAuthTypes.User | null): void => {
        if (!firebaseUser) {
            listener(null);
            return;
        }

        const user: IUser = {
            name: firebaseUser.displayName ?? DEFAULT_USER_NAME,
            avatarImageUrl: firebaseUser.photoURL
        };

        listener(user);
    };

    const unsubscribe = auth().onAuthStateChanged(handleFirebaseAuthStateChanged);
    return unsubscribe;
};