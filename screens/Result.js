import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, Image, Dimensions } from 'react-native';

const Result = ({ route }) => {
  const { aisleName } = route.params;
  const [plants, setPlants] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://192.168.1.5:4000/api/plant/aisle/${aisleName}`);
      const data = await response.json();
      const updatedData = data.map((item) => ({
        ...item,
        plantImage: extractFileIDFromURL(item.plantImage), // Extract file ID from the URL
      }));
      setPlants(updatedData);
      setLoading(false);
    } catch (error) {
      console.error('Error while fetching plants:', error);
      setLoading(false);
    }
  };

  const extractFileIDFromURL = (url) => {
    const regex = /file\/d\/(.+?)\/view/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  useEffect(() => {
    fetchData(); // Call the async function to fetch data
  }, [aisleName]);

  const screenHeight = Dimensions.get('window').height;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.heading}>Plants in {aisleName}</Text>
        {loading ? (
          <Text>Loading...</Text>
        ) : plants === null || plants.length === 0 ? (
          <Text>No plants found in this aisle.</Text>
        ) : (
          <FlatList
            data={plants}
            keyExtractor={(item) => item._id}
            numColumns={2} // Set the number of columns to 2
            columnWrapperStyle={{
            justifyContent: 'space-between', // Align items in each column

            }} // Add a style for the column wrapper
            renderItem={({ item }) => (
              <View style={styles.plantItem}>
                <Image
                  source={{ uri: `https://drive.google.com/uc?export=view&id=${item.plantImage}` }}
                  style={{ width: 150, height: 150, borderRadius: 8 }} // Adjust image width and add borderRadius for styling
                />
                <Text style={styles.plantName}>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

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
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Bold',
    margin: 16,
  },
  plantItem: {
    margin: 18,
  },
  plantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  columnWrapper: {
    justifyContent: 'space-between', // Align items in each column
  },
});

export default Result;
