import React, { Component } from "react";
import {
  Text,
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  AlertIOS,
  TouchableHighlight
} from "react-native";
import ListItem from "../components/ListItem";
import { Ionicons } from "@expo/vector-icons";

export default class ListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Plakattouren",
      headerRight: (
        <TouchableHighlight onPress={navigation.getParam("clickAdd", () => {})}>
          <Ionicons
            name="ios-add"
            size={36}
            color="#0a84ff"
            style={{ marginRight: 18 }}
          />
        </TouchableHighlight>
      )
    };
  };

  state = {
    routes: []
  };

  componentDidMount() {
    //AsyncStorage.clear();
    this.getAllRoutes();
    this.props.navigation.addListener("willFocus", this.getAllRoutes);
    this.props.navigation.setParams({ clickAdd: this.clickAdd });
  }

  getAllRoutes = async () => {
    const allKeys = await AsyncStorage.getAllKeys();
    const routes = await AsyncStorage.multiGet(allKeys);
    this.setState({ routes: routes.map(([_, data]) => JSON.parse(data)) });
  };

  clickAdd = () => {
    // TODO: add prompt for Android
    AlertIOS.prompt(
      "Insert tourname",
      null,
      tourName => this.addNewRoute(tourName),
      "plain-text"
    );
  };

  addNewRoute = async tourName => {
    let date = new Date().toISOString().substring(0, 10);
    const key = Math.random()
      .toString(36)
      .substring(2);
    try {
      await AsyncStorage.setItem(
        key,
        JSON.stringify({ key, name: tourName, date, locations: [] })
      );
      this.getAllRoutes();
    } catch (error) {
      // Error saving data
      console.log(error);
    }
  };

  deleteRoute = key => {
    this.setState({
      routes: this.state.routes.filter(route => route.key !== key)
    });
    AsyncStorage.removeItem(key);
  };

  calculateInitialRegion(item) {
    let latSum = 0;
    let lonSum = 0;
    let maxLat = -90;
    let minLat = 90;
    let maxLon = -180;
    let minLon = 180;

    if (item.locations.length === 0) {
      return {
        latitude: 51.133481,
        longitude: 10.018343,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1
      };
    }

    for (location of item.locations) {
      latSum += location.latitude;
      lonSum += location.longitude;
      maxLat = Math.max(maxLat, location.latitude);
      maxLon = Math.max(maxLon, location.longitude);
      minLat = Math.min(minLat, location.latitude);
      minLon = Math.min(minLon, location.longitude);
    }

    let initialLat = latSum / item.locations.length;
    let initialLon = lonSum / item.locations.length;
    return {
      latitude: initialLat,
      longitude: initialLon,
      latitudeDelta: maxLat - minLat + 0.02,
      longitudeDelta: maxLon - minLon + 0.02
    };
  }

  _onPressItem = (item, posterCount) => {
    this.props.navigation.navigate("Route", {
      item: item,
      posterCount: posterCount,
      initialRegion: this.calculateInitialRegion(item)
    });
  };

  _renderItem = ({ item }) => {
    let posterCount = 0;
    for (let location of item.locations) {
      posterCount += location.count;
    }

    return (
      <ListItem
        id={item.key}
        onPressItem={() => this._onPressItem(item, posterCount)}
        name={item.name}
        locationsCount={item.locations.length}
        posterCount={posterCount}
        deleteRoute={() => this.deleteRoute(item.key)}
      />
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <FlatList
          data={this.state.routes}
          renderItem={this._renderItem}
          keyExtractor={item => item.key}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
