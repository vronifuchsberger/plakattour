import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  AsyncStorage,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Animated
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import UIStepper from "react-native-ui-stepper";

export default class LocationDetail extends React.Component {
  state = {
    height: new Animated.Value(0)
  };

  closeDetail = () => {
    Animated.timing(
      // Animate value over time
      this.state.height, // The value to drive
      {
        toValue: 0 // Animate to final value of 1
      }
    ).start(); // Start the animation
  };

  openDetail = () => {
    Animated.timing(
      // Animate value over time
      this.state.height, // The value to drive
      {
        toValue: 1 // Animate to final value of 1
      }
    ).start(); // Start the animation
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
                <Text style={styles.primaryText}>This is my details box.</Text>
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
                  onPress={() => console.log("Löschen")}
                  style={styles.button}
                  accessibilityLabel="Lösche diese Location"
                >
                  <Text style={styles.buttonText}>Löschen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log("Abgehängt")}
                  accessibilityLabel="Markiere Plakate an dieser Stelle als
              abgehängt"
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Abgehängt</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowText}>Anzahl</Text>
                <UIStepper
                  onValueChange={value => {
                    console.log(value);
                  }}
                  displayValue={true}
                  tintColor={"#ff453a"}
                  borderColor={"#ff453a"}
                  textColor={"#ff453a"}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.rowText}>fehlend oder kaputt</Text>
                <UIStepper
                  onValueChange={value => {
                    console.log(value);
                  }}
                  displayValue={true}
                  tintColor={"#ff453a"}
                  borderColor={"#ff453a"}
                  textColor={"#ff453a"}
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
    flex: 1
  },
  button: {
    backgroundColor: "#E3E3E5",
    borderRadius: 5,
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    flexGrow: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40
  },
  buttonText: {
    color: "#ff453a",
    fontSize: 17
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "blue",
    height: 30,
    marginTop: 15,
    alignItems: "center"
  },
  rowText: {
    fontSize: 17
  }
});
