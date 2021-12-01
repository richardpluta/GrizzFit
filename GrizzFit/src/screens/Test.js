import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button } from 'react-native';
import Loader from '../components/Loader';

// @refresh reset
export default function Test({ navigation }) {
  const [favs, setFavs] = useState([])
  const defaultFavs = [{isFavorite: false, key: 1}, {isFavorite: false, key: 2}, {isFavorite: true, key: 3}]
  
  useEffect(() => {
    setFavs(defaultFavs)
  }, [])

  useEffect(() => {
    console.log(favs.length);
  }, [favs])

  const updateFavs = () => {
    if (favs.length < 1) return;

    let favsCopy = [...favs]
    favsCopy.forEach(fav => {
      fav.isFavorite = !fav.isFavorite
    })
    
    setFavs([...favsCopy])
  }

  return (
    <View style={styles.container}>
      {favs.length > 0? 
        <Text style={styles.text}>{favs.map(x => x.isFavorite.toString() + '\n')}</Text>
        :
        <Loader/>
      }
      <Button title={"Update Favorites"} onPress={updateFavs} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272121',
  },
  text: {
    color: "#CCCCCC",
    paddingTop: 15,
    fontSize: 25,
    textAlign: "center"
  },
  formGifTest: {
    width: '100%',
    height: '33%',
  },
});
