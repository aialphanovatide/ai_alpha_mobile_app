import {React} from 'react';
import Navigation from './navigation/Navigation';
import {SafeAreaView, StyleSheet, StatusBar, Platform} from 'react-native';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
    backgroundColor: '#242427',
  },
});
