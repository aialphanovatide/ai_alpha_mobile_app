import React, { useState } from 'react';
import { Text, TextInput, Alert } from 'react-native';
import Purchases from 'react-native-purchases';
import styles from './styles';
import { API_KEY } from '../../constants';



const LoginForm = ({ onLogin }) => {
  const [newUserId, setNewUserId] = useState('');
  Purchases.configure({apiKey: API_KEY, usesStoreKit2IfAvailable: false});

  console.warn(
    "Public-facing usernames aren't optimal for user ID's - you should use something non-guessable, like a non-public database ID. For more information, visit https://docs.revenuecat.com/docs/user-ids.",
  );

  const login = async () => {
    const { customerInfo, created } = await Purchases.logIn(newUserId);
  };

  return (
    <>
      <Text style={styles.headline}>Login</Text>
      <TextInput
        value={newUserId}
        onChangeText={setNewUserId}
        onEndEditing={login}
        placeholder="Enter App User ID"
        placeholderTextColor="lightgrey"
        style={styles.input}
      />
    </>
  );
};

export default LoginForm;
