import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';
import styles from './ListItem.styles';

export default class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    let swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: '#ff453a',
        onPress: this.props.deleteRoute,
      },
    ];

    return (
      <Swipeout right={swipeoutBtns} backgroundColor='white'>
        <TouchableOpacity onPress={this._onPress} style={styles.itemWrapper}>
          <View style={styles.textWrapper}>
            <Text style={styles.primaryText}>{this.props.name}</Text>
            <Text style={styles.secondaryText}>
              {this.props.posterCount} Plakate an {this.props.locationsCount}{' '}
              Standorten
            </Text>
          </View>
          <Ionicons
            name='ios-arrow-forward'
            size={26}
            color='#C7C7CC'
            style={styles.arrow}
          />
        </TouchableOpacity>
      </Swipeout>
    );
  }
}
