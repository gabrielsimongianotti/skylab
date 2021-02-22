import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import CreateAppointment from '../pages/CreateAppointment';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' }
    }}
  >
    <Auth.Screen name='Dashboard' component={Dashboard} />
    <Auth.Screen name='CreateAppointment' component={CreateAppointment} />
    <Auth.Screen name='Profile' component={Profile} />
    <Auth.Screen name='SignIn' component={SignIn} />
    <Auth.Screen name='SignUp' component={SignUp} />
  </Auth.Navigator>
);

export default AuthRoutes;
