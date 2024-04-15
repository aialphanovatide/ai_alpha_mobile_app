import {Image, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useDappsStyles from './DAppsStyles';
import Loader from '../../../../../../../Loader/Loader';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';
import {findMessageByCoin} from '../../NoContentMessage/staticNoContentDescriptions';
import FastImage from 'react-native-fast-image';

const ProtocolItem = ({
  protocol,
  styles,
  handleActiveProtocol,
  activeProtocol,
}) => {
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    const checkImageURL = async url => {
      try {
        const response = await fetch(url);
        // console.log('Dapps images function response: ', response.headers);
        if (
          response.headers.map['content-type'] &&
          response.headers.map['content-type'].startsWith('image/png')
        ) {
          setHasImage(true);
        }
      } catch (error) {
        console.error('Error al verificar el URL de la imagen:', error);
        setHasImage(false);
      }
    };
    checkImageURL(protocol.image);
  }, [protocol]);

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
      {hasImage ? (
        <FastImage
          source={{
            uri: protocol.image,
            priority: FastImage.priority.normal,
          }}
          style={styles.protocolImage}
          resizeMode="contain"
          fallback={true}
        />
      ) : (
        <Image
          source={require('../../../../../../../../assets/images/fundamentals/dApps/protocol_default.png')}
          style={[styles.protocolImage, styles.defaultProtocol]}
          resizeMode="contain"
        />
      )}

      <View style={styles.line} />
      <View style={styles.protocolDataContainer}>
        <View style={styles.row}>
          <Text style={styles.protocolName}>{protocol.name}</Text>
          <Text style={styles.tvl}>
            TVL:
            {` $${formatNumber(protocol.tvl)}`}
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

const DApps = ({getSectionData, coin, handleSectionContent}) => {
  const styles = useDappsStyles();
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [mappedData, setMappedData] = useState([]);
  const [loading, setLoading] = useState(true);

  const generateImageUri = protocol => {
    const formatted_protocol = protocol.toLowerCase().replace(/\s/g, '');
    return `https://${coin}aialpha.s3.us-east-2.amazonaws.com/dapps/${formatted_protocol}.png`;
  };

  useEffect(() => {
    setLoading(true);
    setMappedData([]);

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
      } finally {
        setLoading(false);
      }
    };
    fetchDAppsData(coin);
  }, [coin]);

  const handleActiveProtocol = protocol => {
    if (activeProtocol && protocol.name === activeProtocol.name) {
      setActiveProtocol(null);
    } else {
      setActiveProtocol(protocol);
    }
  };

  useEffect(() => {
    if (!loading && !findMessageByCoin(coin) && mappedData?.length === 0) {
      handleSectionContent('dapps', true);
    }
  }, [mappedData, loading, handleSectionContent]);

  console.log(mappedData);

  return (
    <View>
      {loading ? (
        <Loader />
      ) : mappedData?.length === 0 && findMessageByCoin(coin) ? (
        <NoContentMessage coin={coin} />
      ) : (
        <>
          <View style={styles.mainImageContainer}>
            <FastImage
              style={styles.mainImage}
              resizeMode={'contain'}
              source={{
                uri: `https://${coin}aialpha.s3.us-east-2.amazonaws.com/dapps/dapps.png`,
                priority: FastImage.priority.high,
              }}
              fallback={true}
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
      )}
    </View>
  );
};

export default DApps;
