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
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import Loader from '../../../../../../../Loader/Loader';

const ProtocolItem = ({
  protocol,
  styles,
  handleActiveProtocol,
  activeProtocol,
}) => {
  const formatNumber = num => {
    const absNum = Math.abs(num);
    const abbrev = ['', 'k', 'm', 'b', 't'];
    const thousand = 1000;

    const tier = (Math.log10(absNum) / 3) | 0;

    if (tier == 0) return num;

    const divisor = Math.pow(thousand, tier);
    const formattedNum = (num / divisor).toFixed(1);

    return formattedNum + abbrev[tier];
  };

  const calculateMarginBottom = (text, threshold) => {
    if (text.length > threshold) {
      return '30%';
    } else {
      return '15%';
    }
  };

  const marginValue = calculateMarginBottom(protocol.description, 40);
  return (
    <View
      style={[
        styles.protocolItemContainer,
        activeProtocol &&
          activeProtocol.name === protocol.name &&
          styles.activeItem && {marginBottom: marginValue},
      ]}>
      <Image
        source={protocol.image}
        style={styles.protocolImage}
        resizeMode="contain"
      />
      <View style={styles.line} />
      <View style={styles.protocolDataContainer}>
        <View style={styles.row}>
          <Text style={styles.protocolName}>{protocol.name}</Text>
          <Text style={styles.tvl}>TVL: ${formatNumber(protocol.tvl)}</Text>
        </View>
        <Text
          style={
            activeProtocol && activeProtocol.name === protocol.name
              ? styles.protocolDescription
              : styles.hidden
          }>
          {protocol.description}
        </Text>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => handleActiveProtocol(protocol)}>
          <Image
            style={styles.arrowImage}
            source={
              activeProtocol && activeProtocol.name === protocol.name
                ? require('../../../../../../../../assets/images/arrow-up.png')
                : require('../../../../../../../../assets/images/arrow-down.png')
            }
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
              activeProtocol && activeProtocol.name === protocol.name
                ? require('../../../../../../../../assets/images/fundamentals/dApps/active-logo.png')
                : require('../../../../../../../../assets/images/fundamentals/dApps/inactive-logo.png')
            }
            tintColor={theme.dAppsItemBg}
            resizeMode="contain">
            <Image
              style={[
                styles.logo,
                activeProtocol &&
                  activeProtocol.name !== protocol.name &&
                  styles.disabled,
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
  const [activeProtocol, setActiveProtocol] = useState(null);

  const handleActiveProtocol = protocol => {
    if (activeProtocol && protocol.name === activeProtocol.name) {
      setActiveProtocol(null);
    } else {
      setActiveProtocol(protocol);
    }
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
      <View style={styles.dataContainer}>
        {protocols && protocols !== undefined ? (
          protocols.map((protocol, index) => (
            <ProtocolItem
              key={index}
              protocol={protocol}
              styles={styles}
              handleActiveProtocol={handleActiveProtocol}
              activeProtocol={activeProtocol}
            />
          ))
        ) : (
          <Loader />
        )}
      </View>
    </View>
  );
};

export default DApps;
