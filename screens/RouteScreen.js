import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  AsyncStorage,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import { Constants, Location, Permissions, MapView } from "expo";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export class RouteScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("item", "test").name,
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
    region: this.getInitialRegion()
  };

  componentDidMount() {
    this._watchLocationAsync();
  }

  async componentDidUpdate(prevProps, prevState) {
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

  getInitialRegion() {
    let latitude = 0;
    let longitude = 0;
    const item = this.props.navigation.getParam("item");

    if (item && item.locations.length > 0) {
      latitude = item.locations[0].latitude;
      longitude = item.locations[0].longitude;
    }
    return {
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    };
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
        const newState = {
          userLocation: [location.coords.latitude, location.coords.longitude]
        };

        if (!this.state.userLocation && this.state.item.locations.length < 1) {
          newState.region = {
            ...this.state.region,
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          };
        }

        this.setState(newState);
      }
    );
  };

  onRegionChange = region => {
    this.setState({ region });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          {this.state.item.locations.map((marker, i) => (
            <MapView.Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              title={"Ahoi"}
              key={i}
            />
          ))}
        </MapView>

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
      </View>
    );
  }
}
const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
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
  }
});
export default RouteScreen;
