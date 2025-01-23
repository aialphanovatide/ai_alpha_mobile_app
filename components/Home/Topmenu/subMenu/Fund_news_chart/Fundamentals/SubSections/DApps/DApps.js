import {
  Image,
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useDappsStyles from './DAppsStyles';
import FastImage from 'react-native-fast-image';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Component to render each DApp item in the DApps section of the Fundamentals tab. It displays the image, name, TVL, and description of the DApp.

const ProtocolItem = ({
  protocol,
  styles,
  handleActiveProtocol,
  activeProtocol,
  maxLength,
  protocolsNumber = 6,
}) => {
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    const checkImageURL = async url => {
      try {
        const response = await fetch(url);
        if (
          response.headers.map['content-type'] &&
          response.headers.map['content-type'].startsWith('image/png')
        ) {
          setHasImage(true);
        }
      } catch (error) {
        console.error('Error verifying the image URL:', error);
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
  return (
    <TouchableOpacity
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        handleActiveProtocol(protocol);
      }}
      activeOpacity={1}
      style={[
        styles.protocolItemContainer,
        activeProtocol &&
          activeProtocol.name === protocol.name &&
          styles.activeItem,
        maxLength < 100 && {height: 100},
      ]}>
      {hasImage ? (
        <FastImage
          source={{
            uri: protocol.image,
            priority: FastImage.priority.normal,
          }}
          style={[
            styles.protocolImage,
            protocolsNumber > 6 && {alignSelf: 'center'},
          ]}
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

      <View style={[styles.line, protocolsNumber > 6 && {top: '60%'}]} />
      <View style={styles.protocolDataContainer}>
        <View style={styles.row}>
          <Text style={styles.protocolName}>{protocol.name}</Text>
          <Text style={styles.tvl}>
            TVL:
            {` $${formatNumber(protocol.tvl)}`}
          </Text>
        </View>
        <Text
          style={[
            activeProtocol && activeProtocol.name === protocol.name
              ? styles.protocolDescription
              : styles.hidden,
            maxLength < 100 && {height: 60},
          ]}>
          {protocol.description}
        </Text>
        <View style={styles.arrowButton}>
          <Image
            style={styles.arrowImage}
            source={
              activeProtocol && activeProtocol.name === protocol.name
                ? require('../../../../../../../../assets/images/arrow-up.png')
                : require('../../../../../../../../assets/images/arrow-down.png')
            }
            resizeMode="contain"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

// DApps component used in the Fundamentals section. It is used to display the decentralized applications of the selected crypto. It is used to display the image, name, TVL, and description of each DApp.

const DApps = ({coin, handleSectionContent, globalData, loading}) => {
  const styles = useDappsStyles();
  const [activeProtocol, setActiveProtocol] = useState(null);
  const [mappedData, setMappedData] = useState([]);
  const [maxLength, setMaxLength] = useState(0);

  const generateImageUri = protocol => {
    const formatted_protocol = protocol.toLowerCase().replace(/\s/g, '');
    return `https://${coin}aialpha.s3.us-east-2.amazonaws.com/dapps/${formatted_protocol}.png`;
  };

  useEffect(() => {
    if (!globalData || globalData.dapps.status !== 200) {
      setMappedData([]);
    } else {
      const dapps_response = globalData.dapps.message.map(protocol => {
        return {
          id: protocol.id,
          name: protocol.dapps,
          description: protocol.description,
          tvl: protocol.tvl,
          image: generateImageUri(protocol.dapps),
        };
      });
      setMappedData(dapps_response);
      setMaxLength(findMaxLengthDescription(dapps_response));
    }
  }, [globalData, coin]);

  useEffect(() => {
    if (!loading && mappedData?.length === 0) {
      handleSectionContent('dapps', true);
    } else {
      if (!loading && mappedData?.length > 0) {
        handleSectionContent('dapps', false);
      }
    }
  }, [mappedData, loading]);

  const handleActiveProtocol = protocol => {
    if (activeProtocol && protocol.name === activeProtocol.name) {
      setActiveProtocol(null);
    } else {
      setActiveProtocol(protocol);
    }
  };

  const findMaxLengthDescription = data => {
    let maxLength = 0;

    data.forEach(item => {
      if (item.description.length > maxLength) {
        maxLength = item.description.length;
      }
    });
    return maxLength;
  };

  return (
    <View>
      {loading ? (
        <SkeletonLoader quantity={6} type="dapps" />
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
                maxLength={maxLength}
                protocolsNumber={mappedData.length}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default DApps;
