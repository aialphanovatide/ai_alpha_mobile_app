import React, {useEffect, useRef} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import useAboutModalDialogStyles from './AboutModalDialogStyles';
import {Animated} from 'react-native';
import {useSelector} from 'react-redux';
import {
  selectAboutDescription,
  selectAboutTitle,
  selectAboutVisible,
} from '../../store/aboutSlice';

// Component that displays the About Modal. It receives the following props: onClose, visible, description, title.

const AboutModal = ({onClose}) => {
  const styles = useAboutModalDialogStyles();
  const opacity = useRef(new Animated.Value(0)).current;
  const visible = useSelector(selectAboutVisible);
  const title = useSelector(selectAboutTitle);
  const description = useSelector(selectAboutDescription);

  const animatedOnClose = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 125,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 125,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 125,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      animationType={'fade'}
      transparent
      visible={visible}
      presentationStyle="overFullScreen">
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.modalBackground, {opacity}]}>
          <TouchableOpacity style={styles.flex} onPress={animatedOnClose} />
        </Animated.View>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={animatedOnClose}
            style={styles.closeButton}>
            <Image
              source={require('../../assets/images/fundamentals/close-button.png')}
              style={styles.closeButtonImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.aboutTitle}>{title}</Text>
          <Text style={styles.modalDescription}>{description}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default AboutModal;
