import {Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import useTypeOfTokenStyles from './TypeOfTokenStyles';

const TokenItem = ({token, styles}) => {
  return (
    <View style={styles.tokenContainer}>
      <View style={styles.row}>
        <View style={styles.tokenImageContainer}>
          <Image
            style={styles.tokenImage}
            source={token.image}
            resizeMode={'contain'}
          />
        </View>
        <Text style={styles.tokenName}>{token.crypto}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.tokenButton}>
          <Text style={styles.tokenButtonText}>Utility</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tokenButton}>
          <Text style={styles.tokenButtonText}>Governance</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const TypeOfToken = ({tokens}) => {
  const styles = useTypeOfTokenStyles();

  return (
    <View>
      {tokens.map((token, index) => (
        <TokenItem key={index} token={token} styles={styles} />
      ))}
    </View>
  );
};

export default TypeOfToken;
