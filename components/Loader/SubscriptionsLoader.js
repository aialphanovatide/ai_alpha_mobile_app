import React from 'react';
import {Modal, SafeAreaView} from 'react-native';
import Loader from './Loader';
import useLoaderStyles from './LoaderStyles';

const SubscriptionsLoader = ({isLoading}) => {
  const styles = useLoaderStyles();
  return (
    <Modal
      animationType="fade"
      style={styles.fullViewContainer}
      visible={isLoading}>
      <SafeAreaView style={styles.centeredContainer}>
        <Loader />
      </SafeAreaView>
    </Modal>
  );
};

export default SubscriptionsLoader;
