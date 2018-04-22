import React, { Component } from "react";

import { View, Text } from "react-native";
import MapView from "react-native-maps";

class Map extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  render() {
    return (
      <View>
        <MapView
          style={{ width: "100%", height: "100%" }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
      </View>
    );
  }
}

export default Map;
