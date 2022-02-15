import { Alert } from "react-native";

/**
 * Used to retrieve the error message from a caught error value
 * if possible. Otherwise try to stringify the error value.
 * @param error The caught error value
 * @returns A string with the possible error message
 */
export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return String(error);
}

/**
 * Checks whether an error message is present and presents
 * an alert if that is the case.
 * @param errorMessage The error message to handle
 * @param onErrorAlertDismissPress Callback function for 
 * handling press of the dismiss button
 */
export const handleErrorMessage = (
  errorMessage: string | null | undefined,
  onErrorAlertDismissPress: () => any
) => {
  const title = 'Error';

  if (errorMessage) {
    Alert.alert(
      title,
      errorMessage,
      [
        { text: 'Dismiss', onPress: onErrorAlertDismissPress }
      ]
    );
  }
}