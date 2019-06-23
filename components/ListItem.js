import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swipeout from "react-native-swipeout";

export default class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    let swipeoutBtns = [
      {
        text: "Delete",
        backgroundColor: "#ff453a",
        onPress: this.props.deleteRoute
      }
    ];

    return (
      <Swipeout right={swipeoutBtns} backgroundColor="white">
        <TouchableOpacity onPress={this._onPress} style={styles.itemWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.primaryText}>{this.props.name}</Text>
            <Text style={styles.secondaryText}>
              {this.props.posterCount} Plakate an {this.props.locationsCount}{" "}
              Standorten
            </Text>
          </View>
          <Ionicons
            name="ios-arrow-forward"
            size={26}
            color="#C7C7CC"
            style={styles.arrow}
          />
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  itemWrapper: {
    paddingTop: 15,
    marginLeft: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E3E5",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  textWrapper: {
    flex: 1
  },
  primaryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  secondaryText: {
    fontSize: 15,
    color: "#8E8E93"
  },
  arrow: {
    marginRight: 20
  }
});
