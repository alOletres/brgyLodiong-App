import { Provider as PaperProvider } from "react-native-paper";
import { App } from "./App";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { theme } from "./utils/theme";

import SnackBar from "./components/SnackBar";

export default function Main() {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <App />
          <SnackBar />
        </SafeAreaProvider>
      </PaperProvider>
    </StoreProvider>
  );
}
