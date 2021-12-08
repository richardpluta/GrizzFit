import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../providers/AuthProvider';
import { darkModePalette } from '../styles/DarkModePalette';
import { firestore } from '../../config/config';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile({ navigation, route }) {

  const UsersCollectionRef = firestore.collection("users");
  const { user, logout, userAvatar } = useContext(AuthContext)
  const [userInfo, setUserInfo] = useState('')
  const [loading, setLoading] = useState(true)

  const getUserInfo = async () => {
    const userDoc = await UsersCollectionRef.doc(user.uid).get()
    if (!userDoc.exists) { console.log('No such document!'); }
    setUserInfo(userDoc.data())
  }

  useEffect(() => {
    getUserInfo()
    navigation.addListener("focus", () => setLoading(!loading))
  }, [navigation, loading])

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#272121' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={{ uri: userAvatar ? userAvatar : 'https://i.pinimg.com/550x/8c/a2/46/8ca246c002ecebc1ce750edb0ae1ea1d.jpg' }}
        />
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.bio}> {!userInfo.bio ? "No bio found" : userInfo.bio} </Text>

        <View style={styles.btnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => { }}>
                <Text style={styles.userBtnTxt}>Add Friend</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('EditProfile') }}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={ logout }>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272121',
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginVertical: 3
  },
  bio: {
    fontSize: 14,
    fontWeight: '600',
    color: darkModePalette.white,
    textAlign: 'center',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  name: {
    color: darkModePalette.primary,
    fontSize: 30,
    padding: 5,
    textAlign: 'center',
  },
  btnWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: '40%',
    marginTop: 8,
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 20,
    marginBottom: 15,
    backgroundColor: darkModePalette.primary
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center'
  }
});
