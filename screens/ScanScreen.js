import { Text, SafeAreaView,StyleSheet, View, Image, Pressable, Dimensions } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScanScreen = () => {
  const navigation = useNavigation();

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);


  useEffect(() => {
    (async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
    })();
    }, []);
    
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setScannedData(data);

      // Navigate to the Results page with the scanned aisle name as a parameter
      navigation.navigate('Result', { aisleName: data });
    };

  // const ScanScreen = () => {
  //   navigation.navigate('Result')
  // }
  useLayoutEffect(()=> {
    navigation.setOptions({
        headerShown: false,
    })
}, [])
  if (hasPermission === null) {
  return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
  return <Text>No access to camera</Text>;
  }

  return (
    <View>
      <StatusBar style='light'/>
      <View>
        <Image source={require('../assets/ScanScreen.png')} style={{width: '100%', height: 279}}/>
      </View>
      <View style={styles.WhiteContainer}>
        <View style={styles.camerContainer}>
          <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
        <Pressable style={styles.greenButton}>
          <Text style={{color:'white', fontSize: 20, fontWeight: 700}}>Search The Section</Text>
        </Pressable>
      </View>
    </View>
  )
}

const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  WhiteContainer:{
    width: '100%',
    height: '100%',
    backgroundColor:'#F1F1F1',
    marginTop: screenHeight <= 740 ? -200 : -50,
    borderRadius: 40,
    padding: 50,
    flexDirection: 'column',
    alignItems: 'center',
  },
  camerContainer:{
    width: 304,
    height: 330,
    backgroundColor: 'white',
  },
  greenButton:{
    width: 293,
    height: 74,
    backgroundColor: '#16C366',
    borderRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginTop: 40,
  }
})
export default ScanScreen