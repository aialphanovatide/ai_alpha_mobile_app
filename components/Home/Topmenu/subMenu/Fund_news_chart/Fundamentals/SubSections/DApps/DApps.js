import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import useDappsStyles from './DAppsStyles';
import { AppThemeContext } from '../../../../../../../../context/themeContext';

const ProtocolSelector = ({
  protocols,
  handleActiveProtocol,
  activeProtocol,
  styles,
}) => {
  const {theme} = useContext(AppThemeContext);
  return (
    <ScrollView
      style={styles.itemContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}>
      {protocols.map((protocol, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleActiveProtocol(protocol)}>
          <ImageBackground
            style={styles.logoContainer}
            source={
              activeProtocol.name === protocol.name
                ? require('../../../../../../../../assets/images/fundamentals/dApps/active-logo.png')
                : require('../../../../../../../../assets/images/fundamentals/dApps/inactive-logo.png')
            }
            tintColor={theme.dAppsItemBg}
            resizeMode="contain">
            <Image
              style={[
                styles.logo,
                activeProtocol.name !== protocol.name && styles.disabled,
              ]}
              source={protocol.image}
              resizeMode={'contain'}
            />
          </ImageBackground>
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
