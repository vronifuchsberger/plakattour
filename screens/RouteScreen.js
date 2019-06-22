import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  AsyncStorage,
  TouchableHighlight,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import { Constants, Location, Permissions, MapView } from "expo";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import LocationDetail from "../components/LocationDetail";
import DropdownRouteStats from "../components/DropdownRouteStats";

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
            <Text style={{ fontSize: 18 }}>
              {navigation.getParam("item", "test").name}
            </Text>
            {navigation.getParam("showingDropdown") ? (
              <Ionicons
                name="ios-arrow-up"
                size={20}
                color="grey"
                style={{ marginLeft: 3, paddingTop: 3 }}
              />
            ) : (
              <Ionicons
                name="ios-arrow-down"
                size={20}
                color="grey"
                style={{ marginLeft: 3, paddingTop: 3 }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      ),
      headerRight: (
        <View
          style={{
            backgroundColor: "#ff453a",
            borderRadius: 5,
            flexDirection: "row",
            flex: 1,
            marginRight: 15,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            alignItems: "center"
          }}
        >
          <AntDesign
            name="file1"
            size={12}
            color="white"
            style={{ paddingTop: 3 }}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 15,
              marginRight: 15,
              marginLeft: 5
            }}
          >
            {navigation.getParam("posterCount", 0)}
          </Text>
          <AntDesign
            name="pushpino"
            size={14}
            color="white"
            style={{ paddingTop: 2 }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 15,
              marginRight: 5,
              marginLeft: 5
            }}
          >
            {navigation.getParam("item", "test").locations.length}
          </Text>
        </View>
      )
    };
  };

  state = {
    errorMessage: null,
    item: this.props.navigation.getParam("item", "test"),
    userLocation: null,
    showDropdown: false
  };

  componentDidMount() {
    this._watchLocationAsync();

    this.props.navigation.setParams({
      showDropdown: this.changeDropdownShowing,
      showingDropdown: this.state.showDropdown
    });
  }

  changeDropdownShowing = () => {
    this.setState({
      showDropdown: !this.state.showDropdown
    });
  };

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
              note: ""
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
        if (!this.state.userLocation && this.state.item.locations.length < 1) {
          this.map.animateCamera(
            {
              center: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }
            },
            { duration: 200 }
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

  onMarkerPressed = location => {
    console.log(location);
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
          //onRegionChangeComplete={this.onRegionChange}
          showsUserLocation={true}
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
              title={"Ahoi"}
              key={i}
              onPress={this.markerPressed}
              // for draggable markers
              //onDragEnd={(e) => this.setState({ x: e.nativeEvent.coordinate })}
            />
          ))}
        </MapView>
        <DropdownRouteStats />
        <TouchableWithoutFeedback onPress={this.resetRegion}>
          <View
            style={[
              styles.resetRegion,
              { top: this.state.showDropdown ? 60 : 20 }
            ]}
          >
            <FontAwesome
              name="location-arrow"
              size={25}
              color="#ff453a"
              style={styles.resetLocationIcon}
            />
          </View>
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
          <LocationDetail />
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
