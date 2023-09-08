import { View, Text, StyleSheet, SafeAreaView,Image, TextInput, Pressable, Dimensions} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useLayoutEffect,useState,useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import superagent from 'superagent';


const LoginScreen = () => {
  const navigation = useNavigation();
  const screenHeight = Dimensions.get('window').height;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const HomeScreen = () => {
  //   navigation.navigate('Tabs')
  // }
  
  // Connect Login Backend to Front-end
  const handlePress = async () => {
    try {
      const response = await superagent
        .post('http://192.168.1.5:4000/api/user/login')
        .send({ username, password });
  
      if (response.status === 200) {
        await AsyncStorage.setItem('token', response.body.token);
        // Save the user data (and token, if applicable) to local storage or state management
        // localStorage.setItem('userInfo', JSON.stringify(response.body.user));
        // Navigate to the appropriate tab page based on successful authentication
        navigation.navigate('Tabs');
      } else {
        // Display error message
        console.error('Error during authentication:', response.body.message);
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
    }
  };
  

  useLayoutEffect(()=> {
    navigation.setOptions({
        headerShown: false,
    })
}, [])
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/* marginTop: screenHeight <= 740 ? 24 : 42, */}
      <Text style={{fontFamily: "Poppins-Bold", fontSize:32, padding: 20}}>Logo</Text>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/Login.png')} style={{width:screenHeight <= 740 ? 270 : 360, height: screenHeight <= 740 ? 170 : 230}}/>
        <Text style={{fontFamily: "Poppins-Bold", fontSize:screenHeight <= 740 ? 32 : 42, padding: 20}}>Sign In</Text>
        <TextInput 
            style={styles.textInput}
            placeholder='Username'
            onChangeText={text => setUsername(text)}
            value={username}
        />
        <TextInput 
            style={styles.textInput}
            placeholder='Password'
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
        />
        <Pressable style={styles.greenButton} onPress={handlePress}>
          <Text style={{color:'white', fontSize: screenHeight <= 740 ? 24 : 32, fontWeight: 700}}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const screenHeight = Dimensions.get('window').height;
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
        paddingVertical: 30,
      },
    }),
  },
  profileCircle:{
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius:35,
    marginRight: 20,
  },
  imageContainer:{
    flexDirection:'column',
    alignItems:'center',
  },
  ButtonContainer:{
    width: '93%',
    height: 156,
    backgroundColor: '#D9D9D9',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    margin: 15,
    borderRadius: 34,
    
  },
  ButtonTypo:{
    width: 200,
    paddingLeft: 20,
  },
  textInput: {
    color: 'black',
    padding: 20,
    width: 350,
    height:70,
    backgroundColor: 'rgba(217,217,217,0.4)',
    borderRadius: 10,
    marginBottom: 20,
  },
  greenButton:{
    // 
    width: screenHeight <= 740 ? 193 : 293,
    height: screenHeight <= 740 ? 64 : 74,
    backgroundColor: '#16C366',
    borderRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: screenHeight <= 740 ? 20 : 40,
  }
})

export default LoginScreen