import React, { Component } from "react";

import { View, Text, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

import styled from "styled-components";
import { Icon, FormInput } from "react-native-elements";

import getCurrentLocation from "../../utils/getCurrentLocation";

const Wrapper = styled.View`
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
    codeVisible: false,
    code: `[out:json][timeout:3600];
node({{bbox}})["amenity"="drinking_water"];
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
    return getCurrentLocation().then(position => {
      if (position) {
        this.map.animateToRegion({
          ...position.coords,
          latitudeDelta: 0.0025384406541064664,
          longitudeDelta: 0.0024686381220817566
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

    const data = await fetch(
      `https://lz4.overpass-api.de/api/interpreter?[out:json][timeout:3600];node(${bbox})[amenity=drinking_water];out;`
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
            }
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
    return (
      <Wrapper>
        <MapView
          style={{ flex: 1 }}
          provider="google"
          ref={ref => {
            this.map = ref;
          }}
          showsUserLocation
          onRegionChangeComplete={this.onRegionChange}
          onMapReady={this.onMapReady}
        >
          {this.state.markers.map(({ id, coordinate }) => (
            <Marker key={id} coordinate={coordinate} />
          ))}
        </MapView>
        <MenuButton
          onPress={() => this.loadData()}
          reverse={this.state.isLoading}
        />
        {!this.state.codeVisible && (
          <OverpassQuery
            onPress={() => {
              Overpass(this.state.code, (error, data) => {
                console.log(error, data);
              });
            }}
          />
        )}
        <Locate />
        {this.state.codeVisible && (
          <FormInput multiline={true} value={this.state.code} />
        )}
      </Wrapper>
    );
  }
}

export default Map;
