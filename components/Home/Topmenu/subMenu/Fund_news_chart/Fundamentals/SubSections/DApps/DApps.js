import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import useDappsStyles from './DAppsStyles';

const ProtocolSelector = ({
  protocols,
  handleActiveProtocol,
  activeProtocol,
  styles,
}) => {
  return (
    <ScrollView
      style={styles.itemContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {protocols.map((protocol, index) => (
        <TouchableOpacity
          key={index}
          style={styles.logoContainer}
          onPress={() => handleActiveProtocol(protocol)}>
          <Image
            style={[
              styles.logo,
              activeProtocol.name !== protocol.name && styles.disabled,
            ]}
            source={protocol.image}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const DApps = ({protocols}) => {
  const styles = useDappsStyles();
  const [activeProtocol, setActiveProtocol] = useState(protocols[0]);

  const handleActiveProtocol = protocol => {
    setActiveProtocol(protocol);
  };

  return (
    <View>
      <View style={styles.mainImageContainer}>
        <Image
          style={styles.mainImage}
          resizeMode={'contain'}
          source={require('../../../../../../../../assets/images/fundamentals/dApps/dapps.png')}
        />
      </View>
      <ProtocolSelector
        styles={styles}
        protocols={protocols}
        handleActiveProtocol={handleActiveProtocol}
        activeProtocol={activeProtocol}
      />
      <View style={styles.dataContainer}>
        <Text style={styles.title}>{activeProtocol.name}</Text>
        <Text style={[styles.description, styles.text]}>
          {activeProtocol.description}
        </Text>
        <View style={styles.row}>
          <Text style={[styles.strong, styles.text]}>TVL:</Text>
          <Text style={styles.text}>{activeProtocol.tvl}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.strong, styles.text]}>
            Benefits to Ethereum:
          </Text>
          <Text style={styles.text}>{activeProtocol.benefits}</Text>
        </View>
      </View>
    </View>
  );
};

export default DApps;
