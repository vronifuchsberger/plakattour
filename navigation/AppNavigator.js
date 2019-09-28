import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ListScreen from "../screens/ListScreen";
import RouteScreen from "../screens/RouteScreen";
import { AsyncStorage } from "react-native";

export default createAppContainer(
  createStackNavigator({
    RoutesList: {
      screen: ListScreen,
      navigationOptions: {
        headerBackTitle: "Touren"
      }
    },
    Route: {
      screen: RouteScreen
    }
  })
);
