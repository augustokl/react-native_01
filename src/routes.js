import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      User,
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#376191',
        },
        headerTitleAlign: 'center',
        headerTintColor: '#FFF',
        headerBackTitleVisible: false,
      },
    },
  ),
);

export default Routes;
