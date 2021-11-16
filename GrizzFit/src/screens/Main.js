import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../../config/config';
import { AuthContext } from '../navigation/AuthProvider';
import { darkModePalette } from '../styles/DarkModePalette';

export default function Main({ navigation }) {
  const {user, logout} = useContext(AuthContext)

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.welcome}>
        <Text style={styles.greeting}>Hello {user.email}!</Text>
        <TouchableOpacity style={styles.button}
          onPress={logout}
        >
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas maecenas pharetra. Rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui. Amet consectetur adipiscing elit ut aliquam. Massa enim nec dui nunc mattis. Elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at augue. Aliquam sem fringilla ut morbi tincidunt. Faucibus et molestie ac feugiat sed lectus vestibulum mattis ullamcorper. Ipsum consequat nisl vel pretium lectus quam. In nisl nisi scelerisque eu ultrices vitae auctor. Ut venenatis tellus in metus vulputate eu scelerisque felis imperdiet. Dictum sit amet justo donec enim diam vulputate ut. Mi quis hendrerit dolor magna eget est lorem ipsum. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Nibh mauris cursus mattis molestie a iaculis at erat pellentesque. Amet consectetur adipiscing elit duis tristique sollicitudin nibh. Tempor orci eu lobortis elementum nibh tellus molestie nunc non. Nulla facilisi cras fermentum odio. Fusce ut placerat orci nulla pellentesque. Cras semper auctor neque vitae tempus quam pellentesque nec nam.
      </Text>
      <Text style={styles.text}>
        Ligula ullamcorper malesuada proin libero nunc consequat interdum varius. Est pellentesque elit ullamcorper dignissim. Enim ut sem viverra aliquet. Velit euismod in pellentesque massa placerat duis. Gravida quis blandit turpis cursus. Maecenas accumsan lacus vel facilisis volutpat est. Sit amet volutpat consequat mauris nunc congue nisi vitae suscipit. At varius vel pharetra vel. Nec ullamcorper sit amet risus nullam. Penatibus et magnis dis parturient montes nascetur ridiculus. Pharetra magna ac placerat vestibulum lectus mauris ultrices eros in. Cursus metus aliquam eleifend mi in nulla. Proin libero nunc consequat interdum varius. Morbi enim nunc faucibus a pellentesque sit amet porttitor. Maecenas ultricies mi eget mauris pharetra et ultrices neque ornare. Eget duis at tellus at urna. Leo vel fringilla est ullamcorper eget nulla.
      </Text>
      <Text style={styles.text}>
        Nec ultrices dui sapien eget. In nisl nisi scelerisque eu ultrices vitae auctor eu augue. Tellus in metus vulputate eu scelerisque felis imperdiet. Massa sed elementum tempus egestas sed sed risus pretium. Felis bibendum ut tristique et egestas quis ipsum suspendisse. A lacus vestibulum sed arcu non odio euismod lacinia. Nam at lectus urna duis convallis convallis. Praesent semper feugiat nibh sed pulvinar proin gravida hendrerit. Augue mauris augue neque gravida in fermentum. Bibendum est ultricies integer quis auctor elit sed vulputate. Leo vel orci porta non pulvinar neque laoreet suspendisse. Diam sollicitudin tempor id eu nisl nunc mi. Et tortor consequat id porta nibh venenatis cras sed.
      </Text>
      <Text style={styles.text}>
        Id diam maecenas ultricies mi eget mauris pharetra. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue. Eget magna fermentum iaculis eu non diam phasellus vestibulum lorem. Tortor vitae purus faucibus ornare. Adipiscing enim eu turpis egestas pretium. Tempus quam pellentesque nec nam aliquam sem et. Fermentum odio eu feugiat pretium nibh ipsum consequat nisl. In fermentum et sollicitudin ac orci. Pretium vulputate sapien nec sagittis aliquam malesuada. Penatibus et magnis dis parturient. Vestibulum sed arcu non odio euismod lacinia at quis. Vestibulum morbi blandit cursus risus at ultrices. Sagittis vitae et leo duis ut. Lectus arcu bibendum at varius vel pharetra. Non nisi est sit amet facilisis.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272121',
  },
  text: {
    color: "#CCCCCC",
    padding: 15,
    fontSize: 14,
  },
  greeting: {
    color: darkModePalette.white,
    fontSize: 18,
    padding: 10,
    textAlign: 'center',
  },
  welcome: {
    backgroundColor: darkModePalette.shadowAlt,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  button: {
    borderColor: darkModePalette.white,
    backgroundColor: darkModePalette.black,
    alignItems: 'center',
    borderRadius: 10,
  }
});
