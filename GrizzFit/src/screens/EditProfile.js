import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground, TextInput } from 'react-native'
import { firestore, storage } from '../../config/config'
import { AuthContext } from '../providers/AuthProvider'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { darkModePalette } from '../styles/DarkModePalette';
import { DarkTheme } from '@react-navigation/native';
import { Buffer } from 'buffer';

const EditProfile = ({ navigation }) => {

  const UsersCollectionRef = firestore.collection("users");
  const { user, logout } = useContext(AuthContext)

  const [userInfo, setUserInfo] = useState('')
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [transferred, setTransferred] = useState(0)
  const [imageBase64, setImageBase64] = useState("")


  const getUserInfo = async () => {
    const userDoc = await UsersCollectionRef.doc(user.uid).get()
    if (!userDoc.exists) { console.log('No such document!'); }
    setUserInfo(userDoc.data())
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleUpdate = async () => {
    let imgUrl = await uploadImage()

    if (imgUrl == null && userInfo.userImg) {
      imgUrl = userInfo.userImg
    }

    UsersCollectionRef.doc(user.uid)
      .update({
        name: userInfo.name,
        bio: userInfo.bio,
        userImg: imgUrl
      }).then(() => {
        console.log('User updated')
        Alert.alert(
          'Profile updated!',
          'Your profile has updated successfully.'
        )
      })
  }

  const uploadImage = async () => {
    if (image == null) {
      return null
    }
    const uploadUri = image
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

    const extension = filename.split('.').pop()
    const name = filename.split('.').slice(0, -1).join('.')
    filename = name + Date.now() + '.' + extension

    setUploading(true)
    setTransferred(0)

    const storageRef = storage.ref(`photos/${filename}`)
    let buffer = Buffer.from(imageBase64, 'base64')
    task = storageRef.put(buffer, {contentType: 'image/png', cacheControl: 'public, max-age=31536000'})

    // task.then( snapshot => console.log(snapshot), error => console.log(error))

    // task.on('state_changed', (taskSnapshot) => {
    //   console.log(
    //     `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    //   )

    //   setTransferred(
    //     Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
    //     100,
    //   )
    // }, (error) => {
    //   console.log(error.message)
    // })

    // try {
    //   //await task

    //   const url = await storageRef.getDownloadURL()

    //   setUploading(false)
    //   setImage(null)

    //   return url

    // } catch (e) {
    //   console.log(e)
    //   return null
    // }
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  const choosePhotoFromLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    })

    if (!result.cancelled) {
      setImage(result.uri)
      setImageBase64(result.base64)
    }
  }

  var fall = new Animated.Value(1)

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          margin: 20,
          opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
        }}>
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={choosePhotoFromLibrary}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : userInfo
                      ? userInfo.userImg || 'https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Oakland_Golden_Grizzlies_logo.svg/1280px-Oakland_Golden_Grizzlies_logo.svg.png' : 'https://upload.wikimedia.org/wikipedia/en/thumb/8/86/Oakland_Golden_Grizzlies_logo.svg/1280px-Oakland_Golden_Grizzlies_logo.svg.png'
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 24, fontWeight: 'bold', color: darkModePalette.white }}>
            {userInfo ? userInfo.name : ''}
          </Text>
        </View>

        <View style={styles.action}>
          <FontAwesome name="user-o" color="#fff" size={20} />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={userInfo ? userInfo.name : ''}
            onChangeText={(text) => setUserInfo({ ...userInfo, name: text })}
            style={styles.textInput}
          />
        </View>
        <View style={styles.action}>
          <Ionicons name="ios-clipboard-outline" color="#fff" size={20} />
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="Enter bio"
            placeholderTextColor="#666666"
            value={userInfo ? userInfo.bio : ''}
            onChangeText={(text) => setUserInfo({ ...userInfo, bio: text })}
            autoCorrect={true}
            style={[styles.textInput, { height: 40 }]}
          />
        </View>
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.button} onPress={handleUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272121',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#272121',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#272121',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: darkModePalette.white,
  },
  button: {
    borderColor: '#b59a57',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#b59a57'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
});



