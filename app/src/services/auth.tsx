import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
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