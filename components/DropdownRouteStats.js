import React, { useState, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import styles from './DropdownRouteStats.styles';

export default function DropdownRouteStats(props) {
  const { posterCount, locationCount, collectedCount, lostCount } = props;
  const [height, setHeight] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(height, {
      toValue: props.showDropdown ? 60 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, props.showDropdown);

  return (
    // TODO: height is throwing error, find replacement
    <Animated.View style={[styles.wrapper /*, { height: height } */]}>
      <View style={styles.stat}>
        <Text style={styles.number}>{posterCount}</Text>
        <Text style={styles.label}>Plakate</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.number}>{locationCount}</Text>
        <Text style={styles.label}>Standorte</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.number}>{collectedCount}</Text>
        <Text style={styles.label}>Abgehängt</Text>
      </View>
      <View style={styles.stat}>
        <Text style={styles.number}>{lostCount}</Text>
        <Text style={styles.label}>Verlust</Text>
      </View>
    </Animated.View>
  );
}
