import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Animated
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import UIStepper from "react-native-ui-stepper";

export default class LocationDetail extends React.Component {
  state = {
    height: new Animated.Value(0)
  };

  componentWillMount() {
    console.log(this.props.index);
  }

  changeLostCount = value => {
    const newLocations = [...this.props.item.locations];
    newLocations[this.props.index] = {
      ...newLocations[this.props.index],
      lost: value
    };
    this.props.updateItem({
      ...this.props.item,
      locations: newLocations
    });
  };

  changePosterCount = value => {
    const newLocations = [...this.props.item.locations];
    newLocations[this.props.index] = {
      ...newLocations[this.props.index],
      count: value
    };
    this.props.updateItem({
      ...this.props.item,
      locations: newLocations
    });
  };

  setCollected = () => {
    const newLocations = [...this.props.item.locations];
    newLocations[this.props.index] = {
      ...newLocations[this.props.index],
      collected: true
    };
    this.props.updateItem({
      ...this.props.item,
      locations: newLocations
    });
  };

  deleteLocation = () => {
    const newLocations = this.props.item.locations;
    newLocations.splice(this.props.index, 1);
    this.props.updateItem({
      ...this.props.item,
      locations: newLocations
    });
  };

  closeDetail = () => {
    Animated.timing(this.state.height, {
      toValue: 0,
      duration: 250
    }).start();
  };

  openDetail = () => {
    Animated.timing(this.state.height, {
      toValue: 1,
      duration: 300
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
              )
            }
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
                  <Ionicons name="ios-close-circle" size={30} color="#E3E3E5" />
                </TouchableOpacity>
              </Animated.View>
            </View>
            <View style={styles.lowerArea}>
              <View style={styles.lowerAreaButtons}>
                <TouchableOpacity
                  onPress={this.deleteLocation}
                  style={[styles.button, { marginRight: 10 }]}
                  accessibilityLabel="Lösche diese Location"
                >
                  <Feather name="trash-2" size={20} color="#ff453a" />
                  <Text style={styles.buttonText}>Löschen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.setCollected}
                  accessibilityLabel="Markiere Plakate an dieser Stelle als abgehängt"
                  style={styles.button}
                >
                  <Feather name="check-square" size={20} color="#ff453a" />
                  <Text style={styles.buttonText}>Abgehängt</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowText}>Anzahl</Text>
                <UIStepper
                  onValueChange={this.changePosterCount}
                  displayValue={true}
                  tintColor={"#ff453a"}
                  borderColor={"#ff453a"}
                  textColor={"#ff453a"}
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
                  tintColor={"#ff453a"}
                  borderColor={"#ff453a"}
                  textColor={"#ff453a"}
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

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6
  },
  wrapper2: { overflow: "hidden", flex: 1 },
  upperArea: {
    flexDirection: "row"
  },
  closeButton: {
    padding: 5
  },
  primaryText: {
    fontWeight: "bold",
    fontSize: 20
  },
  secondaryText: {},
  textBox: {
    flex: 1
  },
  lowerArea: {
    borderTopWidth: 1,
    borderTopColor: "#E3E3E5",
    marginTop: 15,
    minHeight: 100,
    flex: 1
  },
  lowerAreaButtons: {
    flexDirection: "row",
    flex: 1,
    marginTop: 15
  },
  button: {
    backgroundColor: "#F2F2F7",
    borderRadius: 5,
    marginBottom: 15,
    flexGrow: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "#ff453a",
    fontSize: 13,
    marginTop: 5
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    height: 40,
    alignItems: "center"
  },
  rowText: {
    fontSize: 18,
    fontWeight: "500"
  }
});
