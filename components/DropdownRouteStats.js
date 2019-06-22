import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default class DropdownRouteStats extends React.Component {
  state = {
    height: 0
  };

  updateHeight = showDropdown => {
    Animated.timing(
      // Animate value over time
      this.state.height, // The value to drive
      {
        toValue: 100 // Animate to final value of 1
      }
    ).start();
  };

  render() {
    return (
      <Animated.View style={[styles.wrapper, { height: this.props.height }]}>
        <View style={styles.stat}>
          <Text>5</Text>
          <Text>Plakate</Text>
        </View>
        <View style={styles.stat}>
          <Text>5</Text>
          <Text>Standorte</Text>
        </View>
        <View style={styles.stat}>
          <Text>5</Text>
          <Text>Abgehängt</Text>
        </View>
        <View style={styles.stat}>
          <Text>5</Text>
          <Text>Verlust</Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 2
  },
  stat: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5
  }
});
