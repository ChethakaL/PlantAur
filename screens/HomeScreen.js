import { Text, SafeAreaView, StyleSheet, View, ImageBackground, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const currentTime = new Date().getHours();

  // Define the greeting based on the current time
  let greeting;
  if (currentTime >= 5 && currentTime < 12) {
    greeting = 'Good morning';
  } else if (currentTime >= 12 && currentTime < 17) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  const ScanScreen = () => {
    navigation.navigate('Scan');
  };

  const WorkScreen = () => {
    navigation.navigate('Work');
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
        <Text style={styles.headerText}>Home</Text>
        <View style={styles.profileCircle}></View>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground source={require('../assets/HomeGreeting.png')} style={styles.imageBackground}>
          <Text style={styles.greetingText}>{greeting}</Text>
        </ImageBackground>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={ScanScreen}>
        <View style={styles.buttonTypo}>
          <Text style={styles.buttonTitle}>Check Plants</Text>
          <Text style={styles.buttonDescription}>Scan the QR Code to check the plants in the section.</Text>
        </View>
        <View>
          <Image source={require('../assets/HomeQR.png')} style={{height: windowHeight * 0.17}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer} onPress={WorkScreen}>
        <View style={styles.buttonTypo}>
          <Text style={styles.buttonTitle}>Work Tracker</Text>
          <Text style={styles.buttonDescription}>When working mark the points and it will measure how many hectares you have worked.</Text>
        </View>
        <View>
          <Image source={require('../assets/HomeWork.png')} style={{width: windowWidth*0.440,height: windowHeight * 0.17}} />
        </View>
      </TouchableOpacity>
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
    height: 185,
    marginBottom: windowHeight *0.02,
    flexDirection:'row',
    alignItems:'center',
  },
  greetingText: {
    width: 200,
    fontFamily: 'Poppins-SemiBold',
    fontSize: windowWidth * 0.1,
    color: 'white',
    left: windowWidth * 0.43,
  },
  buttonContainer: {
    width: windowWidth * 0.93,
    height: windowHeight * 0.170,
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: windowWidth * 0.04,
    borderRadius: windowWidth * 0.10,
  },
  buttonTypo: {
    width: windowWidth * 0.5,
    paddingLeft: windowWidth * 0.04,
  },
  buttonTitle: {
    fontSize: windowWidth * 0.06,
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.01,
    fontFamily: 'Poppins-SemiBold',
  },
  buttonDescription: {
    fontFamily: 'Poppins-Light',
  },
});

export default HomeScreen;
