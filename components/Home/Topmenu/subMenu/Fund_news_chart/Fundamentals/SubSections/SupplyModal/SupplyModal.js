import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import useFundamentalsStyles from '../../FundamentalsStyles';

const SupplyModal = ({onClose, visible, description, title}) => {
  const styles = useFundamentalsStyles();

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <TouchableOpacity onPress={onClose} style={styles.modalBackground} />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => onClose()}
            style={styles.closeButton}>
            <Image
              source={require('../../../../../../../../assets/images/fundamentals/close-button.png')}
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

export default SupplyModal;
