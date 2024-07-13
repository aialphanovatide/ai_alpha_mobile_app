import React, {useContext} from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import useAccountStyles from '../styles';
import {AppThemeContext} from '../../../context/themeContext';

const SocialButton = ({socialMediaData, handleRedirect}) => {
  const styles = useAccountStyles();
  const {isDarkMode} = useContext(AppThemeContext);
  return (
    <TouchableOpacity
      onPress={() => handleRedirect(socialMediaData.url)}
      style={styles.socialMediaButton}>
      <Image
        source={
          isDarkMode ? socialMediaData.logo.dark : socialMediaData.logo.light
        }
        style={[
          styles.socialLogo,
          socialMediaData.customSize
            ? {
                width: socialMediaData.customSize.width,
                height: socialMediaData.customSize.height,
              }
            : {},
        ]}
        resizeMode="contain"
        fadeDuration={0}
      />
    </TouchableOpacity>
  );
};

const SocialMedia = () => {
  const styles = useAccountStyles();
  const socialNetworks = [
    {
      name: 'X',
      logo: {
        light: require('../../../assets/images/account/socialMedia/x.png'),
        dark: require('../../../assets/images/account/socialMedia/x.png'),
      },
      url: 'https://x.com/aialphaai',
      customSize: null,
    },
    {
      name: 'Discord',
      logo: {
        light: require('../../../assets/images/account/socialMedia/discord.png'),
        dark: require('../../../assets/images/account/socialMedia/discord-dark.png'),
      },
      url: 'https://discord.gg/nJbmuB3F',
      customSize: {width: 50, height: 32},
    },
    {
      name: 'TikTok',
      logo: {
        light: require('../../../assets/images/account/socialMedia/tiktok.png'),
        dark: require('../../../assets/images/account/socialMedia/tiktok.png'),
      },
      url: 'https://novatidelabs-company.monday.com/boards/1396257853/pulses/1554603375',
      customSize: null,
    },
  ];

  const handleButtonRedirect = url => {
    Linking.openURL(url).catch(err =>
      console.error(`Failed to open ${url}: ${err}`),
    );
  };

  return (
    <View style={styles.socialMediaContainer}>
      <Text style={styles.socialMediaTitle}>Follow Us</Text>
      <View style={styles.buttonsContainer}>
        {socialNetworks.map(network => (
          <SocialButton
            key={network.name}
            socialMediaData={network}
            handleRedirect={handleButtonRedirect}
          />
        ))}
      </View>
    </View>
  );
};

export default SocialMedia;
