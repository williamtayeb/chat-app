import React, { useEffect, useState } from "react";

import { Navigator } from "navigation";
import { IUser } from "models";
import { onAuthStateChanged } from "services/auth";

/**
 * This component represents the entry point for the app
 */
const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [displayLogin, setDisplayLogin] = useState<boolean>(true);

  const handleAuthStateChanged = (user: IUser | null): void => {
    console.log(user);
    setDisplayLogin(user === null);
    if (loading) setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(handleAuthStateChanged);
    return unsubscribe;
  }, []);

  // Don't mount anything while we are loading user state
  if (loading) return null;

  return (
    <Navigator linking={null} displayLogin={displayLogin} />
  );
};

export default App;