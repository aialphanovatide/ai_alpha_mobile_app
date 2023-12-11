import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TopMenuContextProvider} from '../../../context/topMenuContext';
import BottomMenu from '../../BottomMenu/Menu';
import Menu from '../../TopMenu/topmenu';
import Home from '../../Home/Home';
import Analysis from '../../Analysis/Analysis';

const HomeScreen = () => {
  const {height, width} = Dimensions.get('window');
  const [currentSection, setCurrentSection] = useState('Home');

  return (
    <GestureHandlerRootView style={{flex: 1, height, width}}>
      <TopMenuContextProvider>
        {currentSection === 'Home' && (
          <>
            <Menu />
            <Home />
          </>
        )}
        {currentSection === 'Analysis' && <Analysis />}
        <BottomMenu
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
        />
      </TopMenuContextProvider>
    </GestureHandlerRootView>
  );
};
export default HomeScreen;
