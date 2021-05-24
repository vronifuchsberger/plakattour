import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ListScreen from '../screens/ListScreen';
import RouteScreen from '../screens/RouteScreen';

export default createAppContainer(
  createStackNavigator({
    RoutesList: {
      screen: ListScreen,
      navigationOptions: {
        headerBackTitle: 'Touren',
      },
    },
    Route: {
      screen: RouteScreen,
    },
  })
);
