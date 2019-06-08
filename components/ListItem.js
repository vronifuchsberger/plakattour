import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

export default class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "red" : "black";
    return (
      <TouchableOpacity onPress={this._onPress} style={styles.itemWrapper}>
        <View>
          <Text style={styles.primaryText}>{this.props.name}</Text>
          <Text style={styles.secondaryText}>
            {this.props.posterCount} Plakate an {this.props.locationsCount}{" "}
            Standorten
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

styles = StyleSheet.create({
  itemWrapper: {
    paddingTop: 15,
    marginLeft: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E3E5"
  },

  primaryText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5
  },
  secondaryText: {
    fontSize: 15,
    color: "#8E8E93"
  }
});

// "#ff453a" ios red
