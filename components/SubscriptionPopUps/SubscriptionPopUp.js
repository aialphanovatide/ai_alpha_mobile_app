import {BlurView} from '@react-native-community/blur';
import React, {useContext} from 'react';
import {ImageBackground, Modal, Text, TouchableOpacity} from 'react-native';
import useSubscriptionPopUpStyles from './SubscriptionPopUpStyles';
import {AppThemeContext} from '../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';

const SubscriptionPopUp = ({visible, setVisible}) => {
  const styles = useSubscriptionPopUpStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <Modal
      style={styles.modal}
      animationType={'slide'}
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      {/* <BlurView
        style={styles.absolute}
        blurType={isDarkMode ? 'dark' : 'light'}
        blurAmount={1.75}
        blurRadius={1}
      /> */}
      <LinearGradient
        style={styles.absolute}
        colors={
          isDarkMode ? ['#0B0B0B38', '#0B0B0B'] : ['#FFFFFF38', '#FFFFFF']
        }
        locations={[0.38, 0.97]}
      />
      <ImageBackground
        source={
          isDarkMode
            ? require('../../assets/images/popUps/discount-rocket-dark.png')
            : require('../../assets/images/popUps/discount-rocket.png')
        }
        style={[styles.imageContainer]}
        resizeMode="contain">
        <Text style={styles.subtitle}>
          {`Are you enjoying the app? As a thank you,`}
        </Text>
        <Text style={styles.mainTitle}>Enjoy 50% OFF</Text>
        <Text style={[styles.mainTitle, styles.secondaryTitle]}>
          on your first three months!
        </Text>
        <Text style={styles.graySecondaryText}>
          No need to do anything-it's already set up for you!
        </Text>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => setVisible(false)}>
          <LinearGradient
            useAngle
            angle={90}
            colors={['#F9AF08', '#FC5B04']}
            locations={[0, 0.5]}
            style={styles.button}>
            <Text style={styles.buttonText}>Awesome, thanks!</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ImageBackground>
    </Modal>
  );
};

export default SubscriptionPopUp;
