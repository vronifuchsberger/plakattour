import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import UIStepper from 'react-native-ui-stepper';
import styles from './LocationDetail.styles';

export default class LocationDetail extends React.Component {
  state = {
    height: new Animated.Value(0),
  };

  componentWillMount() {
    console.log(this.props.item.locations[this.props.index]);
  }

  changeLostCount = (value) => {
    const newLocations = [...this.props.item.locations];
    newLocations[this.props.index] = {
      ...newLocations[this.props.index],
      lost: value,
    };
    this.props.updateItem({
      ...this.props.item,
      locations: newLocations,
    });
  };

  changePosterCount = (value) => {
    const newLocations = [...this.props.item.locations];
    newLocations[this.props.index] = {
      ...newLocations[this.props.index],
      count: value,
    };
    this.props.updateItem({
      ...this.props.item,
      locations: newLocations,
    });
  };

  setCollected = () => {
    const newLocations = [...this.props.item.locations];
    newLocations[this.props.index] = {
      ...newLocations[this.props.index],
      collected: true,
    };
    this.props.updateItem({
      ...this.props.item,
      locations: newLocations,
    });
  };

  deleteLocation = () => {
    const newLocations = this.props.item.locations;
    newLocations.splice(this.props.index, 1);
    this.props.updateItem({
      ...this.props.item,
      locations: newLocations,
    });
  };

  closeDetail = () => {
    Animated.timing(this.state.height, {
      toValue: 0,
      duration: 250,
    }).start();
  };

  openDetail = () => {
    Animated.timing(this.state.height, {
      toValue: 1,
      duration: 300,
    }).start();
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.openDetail}>
        <Animated.View
          style={[
            styles.wrapper,
            {
              height: Animated.add(
                65,
                Animated.multiply(this.state.height, 200)
              ),
            },
          ]}
        >
          <View style={styles.wrapper2}>
            <View style={styles.upperArea}>
              <View style={styles.textBox}>
                <Text style={styles.primaryText}>
                  {this.props.index}This is my details box.
                </Text>
                <Text style={styles.secondaryText}>
                  This is my details box.
                </Text>
              </View>
              <Animated.View style={{ opacity: this.state.height }}>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={this.closeDetail}
                >
                  <Ionicons name='ios-close-circle' size={30} color='#E3E3E5' />
                </TouchableOpacity>
              </Animated.View>
            </View>
            <View style={styles.lowerArea}>
              <View style={styles.lowerAreaButtons}>
                <TouchableOpacity
                  onPress={this.deleteLocation}
                  style={[styles.button, { marginRight: 10 }]}
                  accessibilityLabel='Lösche diese Location'
                >
                  <Feather name='trash-2' size={20} color='#ff453a' />
                  <Text style={styles.buttonText}>Löschen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.setCollected}
                  accessibilityLabel='Markiere Plakate an dieser Stelle als abgehängt'
                  style={styles.button}
                >
                  <Feather name='check-square' size={20} color='#ff453a' />
                  <Text style={styles.buttonText}>Abgehängt</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowText}>Anzahl</Text>
                <UIStepper
                  onValueChange={this.changePosterCount}
                  displayValue={true}
                  tintColor={'#ff453a'}
                  borderColor={'#ff453a'}
                  textColor={'#ff453a'}
                  fontSize={16}
                  imageWidth={11}
                  initialValue={
                    this.props.item.locations[this.props.index].count
                  }
                />
              </View>
              <View style={[styles.row, { marginTop: 10 }]}>
                <Text style={styles.rowText}>fehlend oder kaputt</Text>
                <UIStepper
                  onValueChange={this.changeLostCount}
                  displayValue={true}
                  tintColor={'#ff453a'}
                  borderColor={'#ff453a'}
                  textColor={'#ff453a'}
                  fontSize={16}
                  imageWidth={11}
                  initialValue={
                    this.props.item.locations[this.props.index].lost
                  }
                  maximumValue={
                    this.props.item.locations[this.props.index].count
                  }
                />
              </View>
            </View>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}
