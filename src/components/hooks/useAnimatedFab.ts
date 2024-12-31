import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export const useAnimatedFab = ({ extended }: { extended: boolean }) => {
  const [isExtended, setExtended] = useState<boolean>(extended);
  const { navigate } = useNavigation();

  const handlePress = () => {
    setExtended((state) => !state);

    // Route to other page to create request
    if (isExtended) {
      navigate("Compose");
    }
  };
  return { handlePress, isExtended };
};
