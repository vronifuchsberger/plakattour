import React from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './DropdownRouteStats.styles';

export default class DropdownRouteStats extends React.Component {
  state = {
    height: new Animated.Value(0),
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
        duration: 200,
        useNativeDriver: true,
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
