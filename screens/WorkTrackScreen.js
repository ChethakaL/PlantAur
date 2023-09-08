import { Text, SafeAreaView, StyleSheet, View, ImageBackground, Image, Pressable, Platform, Dimensions } from 'react-native';
import React, { useLayoutEffect, useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const WorkTrackScreen = () => {
  const navigation = useNavigation();
  const currentTime = new Date().getHours();

  // Other Const

  const [workerName, setWorkerName] = useState('John Doe'); // Replace with the actual worker's name
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  // Define the greeting based on the current time
  let greeting;
  if (currentTime >= 5 && currentTime < 12) {
    greeting = 'Good morning';
  } else if (currentTime >= 12 && currentTime < 17) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  const [pressCount, setPressCount] = useState(1);
  const [buttonLabel, setButtonLabel] = useState('Start Working');

  useEffect(() => {
    // Request GPS permission when the component mounts
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('GPS permission denied.');
        return;
      }

      // Get the current location once the permission is granted
      const location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };


  const handlePress = async () => {
    const newPressCount = pressCount + 1;
    setPressCount(newPressCount);

    // Determine the button label based on the press count
    switch (newPressCount) {
      case 1:
        setButtonLabel('1st Pinpoint');
        break;
      case 2:
        setButtonLabel('2nd Pinpoint');
        break;
      case 3:
        setButtonLabel('3rd Pinpoint');
        break;
      case 4:
        setButtonLabel('Last Pinpoint');
        break;
      default:
        setButtonLabel('Start Working');
        break;
    }

  // Get the current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const formattedTime = currentDate.toISOString().split('T')[1].substr(0, 8);

  // Save the data to the backend
  try {
    const apiUrl = 'http://192.168.1.5:4000/api/workdata/save';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        workerName,
        longitude,
        latitude,
        date: formattedDate,
        time: formattedTime,
      }),
    });

    if (response.ok) {
      console.log('Work data saved successfully.');
    } else {
      console.error('Failed to save work data to the server.');
    }
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <View style={styles.header}>
        <Text style={styles.headerText}>Work Tracker</Text>
        <View style={styles.profileCircle}></View>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground source={require('../assets/WorkTracker.png')} style={styles.imageBackground}>
          <Text style={styles.greetingText}>{greeting}</Text>
        </ImageBackground>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.whiteContainer}>
          <View>
            <Text style={styles.descriptionText}>
              When working, you need to click the below button to start working and then when you finish one end, click the below button to pin.
            </Text>
            <Text style={styles.descriptionText}>
              The four corners should be pinned at last, then the work will be calculated. When you click the below button, it will show your status as working until you finish all four points.
            </Text>
          </View>
          <Image source={require('../assets/WorkCon.png')} style={{height: windowHeight * 0.30, borderRadius:20,}}/>
        </View>
        <Pressable style={styles.greenButton} onPress={handlePress}>
          <Text style={styles.buttonLabel}>{buttonLabel}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    ...Platform.select({
      ios: {
        // Apply padding or margin for iOS safe area
        paddingTop: 20,
        paddingBottom: 20,
      },
      android: {
        // Apply padding or margin for Android safe area
        paddingVertical: 20,
      },
    }),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: windowWidth * 0.04,
  },
  headerText: {
    fontSize: windowWidth * 0.08,
    fontFamily: 'Poppins-Bold',
  },
  profileCircle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    backgroundColor: 'blue',
    borderRadius: windowWidth * 0.35,
    marginRight: windowWidth * 0.05,
  },
  imageContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  imageBackground:{
    width: 369,
    height: 152,
    marginBottom: windowHeight *0.02,
    flexDirection:'row',
    alignItems:'center',
  },
  greetingText: {
    width: 200,
    fontFamily: 'Poppins-SemiBold',
    fontSize: windowWidth * 0.1,
    color: 'white',
    left: windowWidth * 0.03,
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  whiteContainer: {
    width: windowWidth * 0.97,
    height: windowHeight * 0.3,
    backgroundColor: '#D1D1D1',
    padding: windowWidth * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: windowWidth * 0.1,
  },
  descriptionText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: windowWidth * 0.033,
    width: windowWidth * 0.55,
  },
  greenButton: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.1,
    backgroundColor: '#16C366',
    borderRadius: windowWidth * 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowHeight * 0.05,
  },
  buttonLabel: {
    color: 'white',
    fontSize: windowWidth * 0.05,
    fontWeight: 'bold',
  },
});

export default WorkTrackScreen;
