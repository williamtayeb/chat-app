import React, { useEffect, useState } from "react";

import { Navigator } from "navigation";
import { IUser } from "models";
import { onAuthStateChanged, signOut } from "services/auth";
import { ThemeContext } from "context";
import { theme } from "styles";
import { seedRandomData } from "models/utils";

/**
 * This component represents the entry point for the app
 */
const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [displayLogin, setDisplayLogin] = useState<boolean>(true);

  const handleAuthStateChanged = (user: IUser | null): void => {
    // If the user state is null then the user has not
    // logged in yet so therefore we should display the 
    // login screen.
    setDisplayLogin(user === null);
    if (loading) setLoading(false);
  }

  useEffect(() => {
    // TODO remove this comment and the below statement
    //signOut();
    //seedRandomData(10);

    // Listen for changes to auth state to check if user
    // is already logged in
    const unsubscribe = onAuthStateChanged(handleAuthStateChanged);
    return unsubscribe;
  }, []);

  // Don't mount anything while we are loading user state
  if (loading) return null;

  // TODO provide linking
  return (
    <ThemeContext.Provider value={theme}>
      <Navigator linking={null} displayLogin={displayLogin} />
    </ThemeContext.Provider>
  );
};

export default App;