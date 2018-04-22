import React, { Component } from "react";

import { View, Text, Platform } from "react-native";
import MapView from "react-native-maps";

import styled from "styled-components";
import { Icon } from "react-native-elements";

const Wrapper = styled.View`
  flex: 1;
  background-color: red;
`;

const MenuButton = styled(Icon).attrs({
  raised: true,
  name: "heartbeat",
  type: "font-awesome",
  color: "#f50",
  containerStyle: {
    position: "absolute",
    right: 18,
    top: Platform.OS === "ios" ? 24 : 18
  }
})``;

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
      <Wrapper>
        <MapView
          style={{ width: "100%", height: "100%" }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        />
        <MenuButton onPress={() => console.log("hello")} />
      </Wrapper>
    );
  }
}

export default Map;
