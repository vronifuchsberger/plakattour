import React from 'react';
import { View, TouchableHighlight, Share } from 'react-native';
import { Feather } from '@expo/vector-icons';
import styles from './Share.styles';

export default class extends React.Component {
  async onShare() {
    try {
      const result = await Share.share({
        message: 'Someday this will be a url to the export file',
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
          <Feather
            name='share'
            size={22}
            color='#ff453a'
            style={styles.shareIcon}
          />
        </View>
      </TouchableHighlight>
    );
  }
}
