import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  AsyncStorage,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated
} from "react-native";
import { Constants, Location, Permissions, MapView } from "expo";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import LocationDetail from "../components/LocationDetail";
import DropdownRouteStats from "../components/DropdownRouteStats";
import Share from "../components/Share";

export class RouteScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <TouchableWithoutFeedback onPress={() => params.showDropdown()}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "600" }}>
              {navigation.getParam("item", "test").name}
            </Text>
            {navigation.getParam("showingDropdown") ? (
              <Ionicons
                name="ios-arrow-up"
                size={18}
                color="#C7C7CC"
                style={{ marginLeft: 5, paddingTop: 3 }}
              />
            ) : (
              <Ionicons
                name="ios-arrow-down"
                size={18}
                color="#C7C7CC"
                style={{ marginLeft: 5, paddingTop: 3 }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      ),
      headerRight: <Share />
    };
  };

  state = {
    errorMessage: null,
    item: this.props.navigation.getParam("item", "test"),
    userLocation: null,
    showDropdown: false,
    locateMeOffset: new Animated.Value(15),
    activeLocationIndex:
      this.props.navigation.getParam("item", "test").locations.length > 0
        ? 0
        : -1
  };

  componentDidMount() {
    this._watchLocationAsync();

    this.props.navigation.setParams({
      showDropdown: this.changeDropdownShowing,
      showingDropdown: this.state.showDropdown
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.showDropdown !== prevState.showDropdown) {
      this.props.navigation.setParams({
        showingDropdown: this.state.showDropdown
      });
    }

    if (this.state.item !== prevState.item) {
      this.props.navigation.setParams({ item: this.state.item });
      try {
        await AsyncStorage.setItem(
          this.state.item.key,
          JSON.stringify(this.state.item)
        );
      } catch (error) {
        // Error saving data
        console.log(error);
      }
    }
  }

  componentWillUnmount() {
    if (this.locationSubscription) {
      this.locationSubscription.remove();
    }
  }

  calculateLostPosters = () => {
    let lost = 0;
    for (location of this.state.item.locations) {
      lost += location.lost;
    }
    return lost;
  };

  calculatePosterCount = () => {
    let posterCount = 0;
    for (location of this.state.item.locations) {
      posterCount += location.count;
    }
    return posterCount;
  };

  calculateCollectedPosters = () => {
    let collected = 0;
    for (location of this.state.item.locations) {
      if (location.collected) {
        collected++;
      }
    }
    return collected;
  };

  changeDropdownShowing = () => {
    Animated.timing(this.state.locateMeOffset, {
      toValue: this.state.showDropdown ? 15 : 75,
      duration: 200
    }).start();
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };

  addNewLocation = () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});

    const item = this.state.item;

    if (this.state.errorMessage) {
      console.log(this.state.errorMessage);
    } else if (location) {
      this.setState({
        item: {
          ...item,
          locations: [
            ...item.locations,
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              count: 1,
              note: "",
              lost: 0,
              collected: false
            }
          ]
        }
      });
    }
  };

  _watchLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    this.locationSubscription = await Location.watchPositionAsync(
      {},
      location => {
        if (
          this.map &&
          !this.state.userLocation &&
          this.state.item.locations.length < 1
        ) {
          this.map.animateToRegion(
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            },
            200
          );
        }

        this.setState({
          userLocation: [location.coords.latitude, location.coords.longitude]
        });
      }
    );
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  resetRegion = () => {
    this.map.animateToRegion(
      {
        latitude: this.state.userLocation[0],
        longitude: this.state.userLocation[1]
      },
      200
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={this.props.navigation.getParam("initialRegion")}
          showsUserLocation={true}
          showsCompass={false}
          moveOnMarkerPress={true}
          ref={map => {
            this.map = map;
          }}
        >
          {this.state.item.locations.map((marker, i) => (
            <MapView.Marker
              draggable
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              key={i}
              onPress={() => this.setState({ activeLocationIndex: i })}
              // for draggable markers
              //onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
            />
          ))}
        </MapView>
        <DropdownRouteStats
          showDropdown={this.state.showDropdown}
          posterCount={this.calculatePosterCount()}
          locationCount={(this.state.item.locations || []).length}
          collectedCount={this.calculateCollectedPosters()}
          lostCount={this.calculateLostPosters()}
        />
        <TouchableWithoutFeedback onPress={this.resetRegion}>
          <Animated.View
            style={[styles.resetRegion, { top: this.state.locateMeOffset }]}
          >
            <FontAwesome
              name="location-arrow"
              size={25}
              color="#ff453a"
              style={styles.resetLocationIcon}
            />
          </Animated.View>
        </TouchableWithoutFeedback>
        <View style={styles.overlays}>
          <TouchableHighlight
            style={styles.addButton}
            onPress={this.addNewLocation}
          >
            <Ionicons
              name="ios-add"
              size={40}
              color="white"
              style={styles.addIcon}
            />
          </TouchableHighlight>
          {this.state.item.locations.length > 0 ? (
            <LocationDetail
              item={this.state.item}
              updateItem={item => this.setState({ item })}
              index={Math.max(this.state.activeLocationIndex, 0)}
            />
          ) : null}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  overlays: {
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
    flex: 1
  },
  addButton: {
    bottom: 10,
    backgroundColor: "#ff453a",
    alignSelf: "flex-end",
    borderRadius: 28,
    height: 56,
    width: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6
  },
  addIcon: {
    marginLeft: 2,
    marginTop: 4
  },
  resetRegion: {
    position: "absolute",
    backgroundColor: "white",
    right: 15,
    padding: 10,
    borderRadius: 7,
    alignSelf: "flex-end",
    height: 45,
    width: 45,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default RouteScreen;
