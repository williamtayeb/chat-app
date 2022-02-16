import React, { useEffect, useState } from "react";

import { Navigator, linking } from "navigation";
import { User } from "models/types";
import { onAuthStateChanged } from "services/auth";
import { ThemeContext } from "context";
import { theme } from "styles";

/**
 * Represents the entry point for the app
 */
const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [displayLogin, setDisplayLogin] = useState<boolean>(true);

  const handleAuthStateChanged = (user: User | null): void => {
    // If the user state is null then the user has not
    // logged in yet so therefore we should display the 
    // login screen.
    setDisplayLogin(user === null);
    if (loading) setLoading(false);
  }

  useEffect(() => {
    // Listen for changes to auth state to check if user
    // is already logged in
    const unsubscribe = onAuthStateChanged(handleAuthStateChanged);
    return unsubscribe;
  }, []);

  // Don't mount anything while we are loading user state
  if (loading) return null;

  return (
    <ThemeContext.Provider value={theme}>
      <Navigator
        linking={linking}
        displayLogin={displayLogin}
      />
    </ThemeContext.Provider>
  );
};

export default App;