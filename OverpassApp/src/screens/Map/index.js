import React, { Component } from "react";

import { View, Text, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

import styled from "styled-components";
import { Icon, FormInput } from "react-native-elements";

import ClusteredMapView from "react-native-maps-super-cluster";

import getCurrentLocation from "../../utils/getCurrentLocation";

const Wrapper = styled.View`
  flex: 1;
`;

const MapWrapper = styled.View`
  flex: 1;
`;

const MenuButton = styled(Icon).attrs({
  raised: true,
  name: "refresh",
  type: "font-awesome",
  color: "#f50",
  containerStyle: {
    position: "absolute",
    right: 18,
    top: Platform.OS === "ios" ? 24 : 18
  }
})``;

const Locate = styled(Icon).attrs({
  raised: true,
  name: "location-arrow",
  type: "font-awesome",
  color: "blue",
  size: 18,
  containerStyle: {
    position: "absolute",
    left: 18,
    bottom: 18
  }
})``;

const CodeButton = styled(Icon).attrs({
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

const CodeWrapper = styled.View`
  padding-horizontal: 11;
  padding-vertical: 11;
`;

class Map extends Component {
  state = {
    codeVisible: false,
    code: `[out:json][timeout:3600];
node({{bbox}})[amenity=drinking_water];
out;`,
    markers: [],
    isLoading: false
  };

  region: {
    latitude: 13.75326914242899,
    longitude: 100.55545276402489,
    latitudeDelta: 0.5709253825609935,
    longitudeDelta: 0.514984130859375
  };

  onMapReady = () => {
    this.animateToCurrentLocation({
      deltas: {
        latitudeDelta: 0.0025384406541064664,
        longitudeDelta: 0.0024686381220817566
      }
    });
  };

  animateToCurrentLocation = ({ deltas }) => {
    return getCurrentLocation().then(position => {
      if (position) {
        console.log(deltas, {
          ...this.region,
          ...position.coords,
          ...deltas
        });
        this.map.animateToRegion({
          ...this.region,
          ...position.coords,
          ...deltas
        });
      }
    });
  };

  onRegionChange = region => {
    this.region = region;
  };

  loadData = async () => {
    this.setState({
      isLoading: true
    });
    const { region } = this;

    const bbox = `${region.latitude - region.latitudeDelta},${region.longitude -
      region.longitudeDelta},${region.latitude +
      region.latitudeDelta},${region.longitude + region.longitudeDelta}`;

    let code = this.state.code;
    code = code.replace("{{bbox}}", bbox);
    code = code.replace(/(\r\n\t|\n|\r\t)/gm, "");

    const data = await fetch(
      `https://lz4.overpass-api.de/api/interpreter?${code}`
    )
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        this.setState({
          markers: responseJson.elements.map(marker => ({
            id: marker.id,
            coordinate: {
              latitude: marker.lat,
              longitude: marker.lon
            },
            tags: marker.tags
          }))
        });
        this.setState({
          isLoading: false
        });
        return responseJson.elements;
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    console.log(this.state.markers);
    return (
      <Wrapper>
        <MapWrapper>
          <MapView
            style={{ flex: 1 }}
            ref={ref => {
              this.map = ref;
            }}
            showsUserLocation
            onRegionChangeComplete={this.onRegionChange}
            onMapReady={this.onMapReady}
          >
            {this.state.markers.map(({ id, coordinate, ...rest }) => (
              <Marker
                key={id}
                coordinate={coordinate}
                onPress={() => {
                  this.props.navigator.showLightBox({
                    screen: "overpass.MarkerDetails", // unique ID registered with Navigation.registerScreen
                    passProps: { tags: rest.tags }, // simple serializable object that will pass as props to the lightbox (optional)
                    style: {
                      backgroundBlur: "none", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
                      tapBackgroundToDismiss: true // dismisses LightBox on background taps (optional)
                    },
                    adjustSoftInput: "resize" // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
                  });
                }}
              />
            ))}
          </MapView>
          <MenuButton
            onPress={() => this.loadData()}
            reverse={this.state.isLoading}
          />
          <CodeButton
            onPress={() => {
              this.setState({ codeVisible: !this.state.codeVisible });
            }}
          />
          <Locate onPress={this.animateToCurrentLocation} />
        </MapWrapper>
        {this.state.codeVisible && (
          <CodeWrapper>
            <FormInput
              multiline={true}
              value={this.state.code}
              onChangeText={code => {
                this.setState({ code });
              }}
            />
          </CodeWrapper>
        )}
      </Wrapper>
    );
  }
}

export default Map;
