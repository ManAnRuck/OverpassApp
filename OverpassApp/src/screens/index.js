import { Navigation } from "react-native-navigation";
import { ApolloProvider } from "react-apollo";

import client from "../graphql/client";

import Map from "./Map";
import MarkerDetails from "./Map/MarkerDetails";
import SideMenu from "./SideMenu";

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent(
    "overpass.Map",
    () => Map,
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "overpass.MarkerDetails",
    () => MarkerDetails,
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "overpass.SideMenu",
    () => SideMenu,
    client.store,
    ApolloProvider,
    { client }
  );
}
