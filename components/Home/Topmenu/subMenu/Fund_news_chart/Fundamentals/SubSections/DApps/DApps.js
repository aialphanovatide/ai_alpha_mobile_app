import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useDappsStyles from './DAppsStyles';
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

    if (tier === 0) return num;

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
        source={{uri: protocol.image, width: 40, height: 40}}
        style={styles.protocolImage}
        resizeMode="contain"
      />
      <View style={styles.line} />
      <View style={styles.protocolDataContainer}>
        <View style={styles.row}>
          <Text style={styles.protocolName}>{protocol.name}</Text>
          <Text style={styles.tvl}>
            TVL:
            {typeof protocol.tvl === 'string'
              ? protocol.tvl
              : `$${formatNumber(protocol.tvl)}`}
          </Text>
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

const DApps = ({content, getSectionData, coin}) => {
  const styles = useDappsStyles();
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [mappedData, setMappedData] = useState([]);

  const generateImageUri = protocol => {
    const formatted_protocol = protocol.toLowerCase().replace(' ', '');
    return `https://${coin}aialpha.s3.us-east-2.amazonaws.com/dapps/${formatted_protocol}.png`;
  };

  useEffect(() => {
    const fetchDAppsData = async coin => {
      try {
        const response = await getSectionData(
          `/api/dapps?coin_bot_name=${coin}`,
        );
        if (response.status !== 200) {
          setMappedData([]);
        } else {
          // console.log('Dapps: ', response.message);
          const dapps_response = response.message.map(protocol => {
            return {
              id: protocol.id,
              name: protocol.dapps,
              description: protocol.description,
              tvl: protocol.tvl,
              image: generateImageUri(protocol.dapps),
            };
          });
          setMappedData(dapps_response);
        }
      } catch (error) {
        console.log('Error trying to get dApps data: ', error);
      }
    };
    fetchDAppsData(coin);
  }, [coin]);

  if (mappedData === undefined || mappedData === null) {
    return null;
  }

  const handleActiveProtocol = protocol => {
    if (activeProtocol && protocol.name === activeProtocol.name) {
      setActiveProtocol(null);
    } else {
      setActiveProtocol(protocol);
    }
  };
  return (
    <View>
      {mappedData && mappedData !== undefined ? (
        <>
          <View style={styles.mainImageContainer}>
            <Image
              style={styles.mainImage}
              resizeMode={'contain'}
              source={{
                uri: `https://${coin}aialpha.s3.us-east-2.amazonaws.com/dapps/dapps.png`,
                width: 320,
                height: 200,
              }}
            />
          </View>
          <View style={styles.dataContainer}>
            {mappedData?.map((protocol, index) => (
              <ProtocolItem
                key={index}
                coin={coin}
                protocol={protocol}
                styles={styles}
                handleActiveProtocol={handleActiveProtocol}
                activeProtocol={activeProtocol}
              />
            ))}
          </View>
        </>
      ) : (
        <Loader />
      )}
    </View>
  );
};

export default DApps;
