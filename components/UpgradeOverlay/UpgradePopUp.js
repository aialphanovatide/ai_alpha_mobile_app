import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import useUpgradeOverlayStyles from './UpgradeOverlayStyles';

const UpgradePopUp = () => {
  const [closed, setClosed] = useState(false);
  const styles = useUpgradeOverlayStyles();

  const onClose = () => {
    setClosed(true);
  };

  const handleUpgradeTouch = () => {
    console.log(
      'Upgrade touched: this needs to be changed when the subscription screen is ready to navigate to that section',
    );
    setClosed(true);
  };

  return (
    <SafeAreaView style={styles.overlayContainer}>
      <View style={closed ? styles.none : styles.popUp}>
        <TouchableOpacity
          style={styles.closeContainer}
          onPress={() => onClose()}>
          <Image
            style={styles.close}
            source={require('../../assets/images/close.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.popUpText}>
          Would you like to access the information about this coin?
        </Text>
        <Text style={styles.popUpText}>Upgrade your subscription.</Text>
        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={() => handleUpgradeTouch()}>
          <Text style={styles.buttonText}>Upgrade</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpgradePopUp;
