import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import usePrivacyPolicyStyles from './styles';
import BackButton from '../../Analysis/BackButton/BackButton';

const PrivacyPolicy = () => {
    const styles = usePrivacyPolicyStyles();


    return (
    <ScrollView style={styles.scrollview} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <BackButton />
            <View style={styles.container}>
                <Text>asdfasmfasm,fn,asmnf,amsnfsnodnfosindamcosndvonsoinfodmfoasdmfomasofmwlnflknlrkwnfklmwelkfmlwkemfklnvsaoidnvoflenlklk lkndflkvn lk nlkd lkanlknf   asdflask dflkas flk sad f sadfkals fk as f alskflkeqe kw lwer lwekrwlekrf  lsk al </Text>
            </View>
      </View>
    </ScrollView>
  );
};

export default PrivacyPolicy;
