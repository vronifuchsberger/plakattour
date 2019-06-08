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

  _onPressItem = item => {
    this.props.navigation.navigate("Route", { item: item });
  };

  _renderItem = ({ item }) => {
    let posterCount = 0;
    for (let location of item.locations) {
      posterCount += location.count;
    }

    return (
      <ListItem
        id={item.key}
        onPressItem={() => this._onPressItem(item)}
        name={item.name}
        locationsCount={item.locations.length}
        posterCount={posterCount}
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
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
