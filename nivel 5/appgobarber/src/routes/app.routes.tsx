import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DashBoard from '../pages/Dashboard';


const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' }
    }}
  >
    <App.Screen name='DashBoard' component={DashBoard} />
  </App.Navigator>
);

export default AppRoutes;
