import React, { Component } from "react";

import { View, Text, Platform } from "react-native";
import MapView from "react-native-maps";

import styled from "styled-components";
import { Icon, FormInput } from "react-native-elements";

const Wrapper = styled.View`
  flex: 1;
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

const OverpassQuery = styled(Icon).attrs({
  raised: true,
  name: "code",
  type: "font-awesome",
  color: "#f50",
  containerStyle: {
    position: "absolute",
    right: 18,
    bottom: 18
  }
})``;

class Map extends Component {
  state = {
    region: {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    },
    codeVisible: true,
    code: `

[out:json][timeout:3600];
// gather results

  // query part for: “"Drinking Water"”
//  node["amenity"="drinking_water"]({{bbox}});
//area;
//area[name="ประเทศไทย"]->.boundaryarea;
//node["amenity"="drinking_water"](area.boundaryarea);

node({{bbox}})["amenity"="drinking_water"];

// print results
out;
    `
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  render() {
    return (
      <Wrapper>
        <MapView
          style={{ flex: 1 }}
          // region={this.state.region}
          // onRegionChange={this.onRegionChange}
          initialRegion={this.state.region}
        />
        <MenuButton
          onPress={() =>
            this.setState({
              codeVisible: !this.state.codeVisible
            })
          }
        />
        {this.state.codeVisible && (
          <OverpassQuery onPress={() => console.log("hello")} />
        )}
        {!this.state.codeVisible && (
          <FormInput multiline={true} value={this.state.code} />
        )}
      </Wrapper>
    );
  }
}

export default Map;
