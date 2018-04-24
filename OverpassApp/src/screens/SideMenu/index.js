import React, { Component } from "react";
import styled from "styled-components";
import { List, ListItem } from "react-native-elements";
import { Switch } from "react-native";
import { graphql, compose } from "react-apollo";

import UPDATE_EXPERT_MODE_CLIENT from "../../graphql/state/mutations/updateExpertMode";
import GET_EXPERT_MODE_CLIENT from "../../graphql/state/queries/getExpertMode";

const Wrapper = styled.ScrollView`
  flex: 1;
  padding-top: 18;
  padding-horizontal: 11;
  background-color: rgba(255, 255, 255, 1);
`;

const Title = styled.Text`
  font-size: 24;
`;

class SideMenu extends Component {
  state = {
    expert: false
  };

  list = [
    {
      title: "Gespeichert",
      icon: "storage",
      onPress: () => console.log("menu item 1")
    }
  ];
  render() {
    const { updateExpertMode, isExpert } = this.props;
    return (
      <Wrapper>
        <Title>OverpassApp</Title>
        <List>
          {this.list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              onPress={item.onPress}
              rightIcon={item.rightIcon}
            />
          ))}
          <ListItem
            title="Experte"
            rightIcon={
              <Switch
                value={isExpert}
                onValueChange={isExpert => updateExpertMode(isExpert)}
              />
            }
          />
        </List>
      </Wrapper>
    );
  }
}

export default compose(
  graphql(UPDATE_EXPERT_MODE_CLIENT, {
    props: ({ mutate }) => {
      return {
        updateExpertMode: isExpert => mutate({ variables: { isExpert } })
      };
    }
  }),
  graphql(GET_EXPERT_MODE_CLIENT, {
    props: ({
      data: {
        expertMode: { isExpert }
      }
    }) => {
      return {
        isExpert
      };
    }
  })
)(SideMenu);
