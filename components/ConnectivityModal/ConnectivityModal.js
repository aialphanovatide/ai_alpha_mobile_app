import React, {useContext} from 'react';
import {ImageBackground, Modal, Text, TouchableOpacity} from 'react-native';
import useConnectivityModalStyles from './ConnectivityModalStyles';
import {AppThemeContext} from '../../context/themeContext';
import LinearGradient from 'react-native-linear-gradient';

// Component to display a modal when the user is offline or the server is down. It renders a background image and a message to inform the user about the connectivity issue. It receives the serverError, setServerError, modalVisible, setModalVisible, checkConnectivityAndCloseModal, and type as props.

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
            <Text
              style={[
                styles.title,
                styles.subtitle,
                {
                  fontFamily: isDarkMode
                    ? theme.fontSemibold
                    : theme.fontMedium,
                },
              ]}>
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
