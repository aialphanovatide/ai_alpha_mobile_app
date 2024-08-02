import React, {useContext} from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import useConnectivityModalStyles from './ConnectivityModalStyles';
import {AppThemeContext} from '../../context/themeContext';

const ConnectivityModal = ({
  serverError,
  setServerError,
  modalVisible,
  setModalVisible,
  checkConnectivityAndCloseModal,
  type = 'connection',
}) => {
  const styles = useConnectivityModalStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  return type === 'serverDown' ? (
    <Modal
      animationType="slide"
      transparent={true}
      visible={serverError}
      onRequestClose={() => {
        setServerError(false);
      }}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.orangeBox,
            {
              backgroundColor: isDarkMode ? '#451205' : '#FFF7EC',
            },
          ]}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/images/login/serverdown.png')}
              style={styles.imageStyle3}
            />
            <Text
              style={[
                styles.labelText1,
                {
                  color: isDarkMode ? '#FF8D34' : '#FF6C0D',
                },
              ]}>
              Seems like the server is down
            </Text>
          </View>
          <Text
            style={[
              styles.labelText3,
              {
                color: isDarkMode ? '#FF6C0D' : '#A02E0C',
              },
            ]}>
            Please wait a few minutes while our technicians work to solve this
            problem
          </Text>
        </View>
      </View>
    </Modal>
  ) : (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <View style={styles.centeredView}>
        <View
          style={[
            styles.orangeBox,
            {
              backgroundColor: isDarkMode ? '#451205' : '#FFF7EC',
            },
          ]}>
          <View style={styles.row}>
            <Image
              source={require('../../assets/images/login/nointernet.png')}
              style={styles.imageStyle1}
            />
            <Text
              style={[
                styles.labelText1,
                {
                  color: isDarkMode ? '#FF8D34' : '#FF6C0D',
                },
              ]}>
              It seems that you are offline.
            </Text>
          </View>
          <View style={styles.row}>
            <Image
              source={require('../../assets/images/login/reloadsymbol.png')}
              style={styles.imageStyle2}
            />
            <TouchableOpacity onPress={checkConnectivityAndCloseModal}>
              <Text style={styles.labelText2}>Reload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConnectivityModal;
