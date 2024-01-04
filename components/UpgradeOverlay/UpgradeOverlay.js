import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import useUpgradeOverlayStyles from './UpgradeOverlayStyles';

const UpgradeOverlay = ({visible, onClose}) => {
  const styles = useUpgradeOverlayStyles();
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.overlayContainer}>
      <View style={styles.overlayContent}>
        <View style={styles.lockContainer}>
          <Image
            resizeMode="contain"
            style={styles.lockIcon}
            source={require('../../assets/images/lock.png')}
          />
        </View>
        <TouchableOpacity style={styles.upgradeButton} onPress={onClose}>
          <Text style={styles.buttonText}>Upgrade</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UpgradeOverlay;
