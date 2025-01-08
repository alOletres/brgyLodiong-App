import { useState } from "react";
import * as Updates from "expo-updates";

export const useApp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLongPress = async () => {
    setIsLoading(true); // Show loading spinner
    try {
      console.log("Refreshing app...");
      await Updates.reloadAsync(); // Reload the app
    } catch (e) {
      console.error("Error reloading the app:", e);
      setIsLoading(false); // Hide spinner if reload fails
    }
  };
  return { isLoading, handleLongPress };
};
