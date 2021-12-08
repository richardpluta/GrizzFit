import React, { useContext, useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View, ImageBackground, TextInput } from 'react-native'
import { firestore, storage } from '../../config/config'
import { AuthContext } from '../providers/AuthProvider'
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { darkModePalette } from '../styles/DarkModePalette';

const EditProfile = () => {

  const UsersCollectionRef = firestore.collection("users");
  const { user, userAvatar, setUserAvatar } = useContext(AuthContext)

  const [userInfo, setUserInfo] = useState('')
  const [image, setImage] = useState(null)
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
    let remoteUri = null

    UsersCollectionRef.doc(user.uid)
      .update({
        name: userInfo.name,
        bio: userInfo.bio,
        userImg: image
      }).then(() => {
        console.log('User updated')
        Alert.alert(
          'Profile updated!',
          'Your profile has updated successfully.'
        )
      })

      if (userInfo.userImg) {
        remoteUri = await uploadImage(userInfo.userImg, `avatars/${user.uid}`)

        UsersCollectionRef.doc(user.uid)
        .update({
          userImg: remoteUri
        }, {merge: true})
      }
  }

  const uploadImage = async (uri, filename) => {

    return new Promise(async (res, rej) => {
      const response = await fetch(uri)
      const file = await response.blob()

      let upload = storage.ref(filename).put(file)

      upload.on(
        "state_changed",
        snapshot => {},
        err => {
          rej(err)
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL()
          res(url)
        }
      )
    })
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
      setUserAvatar("data:image/png;base64, " + result.base64)
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
                  uri: userAvatar ? userAvatar : 'https://i.pinimg.com/550x/8c/a2/46/8ca246c002ecebc1ce750edb0ae1ea1d.jpg'
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
                      opacity: 0.5,
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
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: darkModePalette.primary,
    paddingBottom: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: darkModePalette.white,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    backgroundColor: darkModePalette.primary,
  },
  buttonText: {
    color: "white",
    fontSize: 16
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
});