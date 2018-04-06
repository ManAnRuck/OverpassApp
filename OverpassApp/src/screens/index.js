import { Navigation } from "react-native-navigation";

import Map from "./Map";

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent("overpass.Map", () => Map);
}
