import React, {useEffect, useRef} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import useFundamentalsStyles from './FundamentalsStyles';
import {Animated} from 'react-native';

const AboutModal = ({onClose, visible, description}) => {
  const styles = useFundamentalsStyles();
  const opacity = useRef(new Animated.Value(0)).current;

  const animatedOnClose = () => {
    onClose();
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 125,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, opacity]);

  return (
    <Modal
      animationType={'fade'}
      transparent
      visible={visible}
      presentationStyle="overFullScreen">
      <Animated.View style={[styles.modalBackground, {opacity}]}>
        <TouchableOpacity
          style={[styles.flex, {opacity}]}
          onPress={animatedOnClose}
        />
      </Animated.View>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => onClose()}
            style={styles.closeButton}>
            <Image
              source={require('../../../../../../assets/images/fundamentals/close-button.png')}
              style={styles.closeButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.aboutTitle}>About</Text>
          <Text style={styles.modalDescription}>{description}</Text>
          <TouchableOpacity>
            <Text style={styles.readMoreText}>Read more</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AboutModal;
