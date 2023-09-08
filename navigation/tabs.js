import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import { TouchableOpacity } from 'react-native';

// Icons
import { Home, User,Camera} from "react-native-feather";

// Screens
import WorkTrackScreen from '../screens/WorkTrackScreen';
import HomeScreen from '../screens/HomeScreen';
import ScanScreen from '../screens/ScanScreen';
import LoginScreen from '../screens/LoginScreen';

const Tabs = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator 
        screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{
                position: 'absolute',
                bottom: 25,
                left: 48,
                right: 20,
                elevation: 0,
                backgroundColor: '#E0E0E0',
                borderRadius: 30,
                width: 320,
                height: 70,
                ...(Platform.OS === 'ios' && { paddingTop: 30 }),// put this padding only to ios
            },
        }}>
          <Tab.Screen name="Home" component={HomeScreen} options={{tabBarIcon: ({focused})=>(
                <Home style={{color: focused ? '#00B938':'black'}} size={38}/>
          )}}/>
          <Tab.Screen name="Work" component={WorkTrackScreen} options={{tabBarIcon: ({focused})=>(

                <User style={{color: focused ? '#00B938':'black'}}/>

          )}}/>
          <Tab.Screen name="Scan" component={ScanScreen} options={{tabBarIcon: ({focused})=>(
                <Camera style={{color: focused ? '#00B938':'black'}}/>
          )}}/>

        </Tab.Navigator>
      );
}

export default Tabs