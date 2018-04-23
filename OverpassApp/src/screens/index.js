import { Navigation } from "react-native-navigation";

import Map from "./Map";
import MarkerDetails from "./Map/MarkerDetails";
import SideMenu from "./SideMenu";

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent("overpass.Map", () => Map);
  Navigation.registerComponent("overpass.MarkerDetails", () => MarkerDetails);
  Navigation.registerComponent("overpass.SideMenu", () => SideMenu);
}
