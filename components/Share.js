import React, { Component } from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Share
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export default class Share extends React.Component {
  async onShare() {
    try {
      const result = await Share.share({
        message: "Someday this will be a url to the export file"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  render() {
    return (
      <TouchableHighlight onPress={this.onShare}>
        <View style={styles.wrapper}>
          <EvilIcons
            name="share-apple"
            size={26}
            color="#C7C7CC"
            style={styles.shareIcon}
          />
        </View>
      </TouchableHighlight>
    );
  }
}

styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "red"
  },
  shareIcon: {}
});
