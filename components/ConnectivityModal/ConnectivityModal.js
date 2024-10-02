import React, {useContext} from 'react';
import {
  ImageBackground,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import useConnectivityModalStyles from './ConnectivityModalStyles';
import {AppThemeContext} from '../../context/themeContext';
import {BlurView} from '@react-native-community/blur';

const ConnectivityModal = ({
  serverError,
  setServerError,
  modalVisible,
  setModalVisible,
  checkConnectivityAndCloseModal,
  type = 'connection',
}) => {
  const styles = useConnectivityModalStyles();
  const {theme, isDarkMode} = useContext(AppThemeContext);
  return (
    <Modal
      style={styles.modal}
      animationType="slide"
      transparent={true}
      visible={type === 'serverDown' ? serverError : modalVisible}
      onRequestClose={() => {
        type === 'serverDown' ? setServerError(false) : setModalVisible(false);
      }}>
      <BlurView
        style={styles.absolute}
        blurType={isDarkMode ? 'dark' : 'light'}
        blurAmount={1.75}
        blurRadius={1}
      />
      <ImageBackground
        source={
          isDarkMode
            ? require('../../assets/images/connectivity-image-dark.png')
            : require('../../assets/images/connectivity-image.png')
        }
        style={[styles.connectivityImage]}
        resizeMode="contain">
        {type === 'serverDown' ? (
          <>
            <Text style={styles.title}>
              {'Uh Oh.\nSeems like the server is down'}
            </Text>
            <Text style={[styles.title, styles.subtitle, {fontFamily: isDarkMode ? theme.fontSemibold : theme.fontMedium }]}>
              Please wait a few minutes until our technicians work to solve the
              problem
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.title}>
              {'Uh Oh.\nIt seems that you are offline.'}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => checkConnectivityAndCloseModal()}>
              <Text style={styles.buttonText}>Reload</Text>
            </TouchableOpacity>
          </>
        )}
      </ImageBackground>
    </Modal>
  );
};

export default ConnectivityModal;
