import React, { Component } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default class DropdownRouteStats extends React.Component {
  state = {
    height: new Animated.Value(0)
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showDropdown !== this.props.showDropdown) {
      this.updateHeight();
    }
  }

  updateHeight = () => {
    Animated.timing(
      // Animate value over time
      this.state.height, // The value to drive
      {
        toValue: this.props.showDropdown ? 60 : 0,
        duration: 200
      }
    ).start();
  };

  render() {
    return (
      <Animated.View style={[styles.wrapper, { height: this.state.height }]}>
        <View style={styles.stat}>
          <Text style={styles.number}>{this.props.posterCount}</Text>
          <Text style={styles.label}>Plakate</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number}>{this.props.locationCount}</Text>
          <Text style={styles.label}>Standorte</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number}>{this.props.collectedCount}</Text>
          <Text style={styles.label}>Abgehängt</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.number}>{this.props.lostCount}</Text>
          <Text style={styles.label}>Verlust</Text>
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

    elevation: 2,
    opacity: 0.85
  },
  stat: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5
  },
  number: {
    fontSize: 20,
    fontWeight: "400",
    color: "#1C1C1E"
  },
  label: {
    color: "#8e8e93",
    fontWeight: "500"
  }
});
