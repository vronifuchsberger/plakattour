import React, { Component } from "react";
import { View, Text, Button, Platform, AsyncStorage } from "react-native";
import { Constants, Location, Permissions, MapView } from "expo";

export class RouteScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("item", "test").name,
      headerRight: (
        <Text>{navigation.getParam("item", "test").locations.length}</Text>
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
        <Button onPress={this.addNewLocation} title="Add new Location" />
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          showsUserLocation={true}
          loadingEnabled={true}
        />
      </View>
    );
  }
}

export default RouteScreen;
