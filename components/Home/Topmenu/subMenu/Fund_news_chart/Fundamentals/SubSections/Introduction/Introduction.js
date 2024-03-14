import {Image, Linking, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useIntroductionStyles from './IntroductionStyles';
import Loader from '../../../../../../../Loader/Loader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NoContentMessage from '../../NoContentMessage/NoContentMessage';

const ExternalLink = ({url, text}) => {
  const styles = useIntroductionStyles();
  const handleLinkRedirect = url => {
    Linking.openURL(url);
  };
  return (
    <TouchableOpacity
      onPress={() => handleLinkRedirect(url)}
      style={styles.linkContainer}>
      <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
  );
};

const Introduction = ({getSectionData, coin, handleSectionContent}) => {
  const styles = useIntroductionStyles();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setContent(null);
    const fetchIntroductionContent = async () => {
      try {
        const response = await getSectionData(
          `/api/get_introduction?coin_name=${coin}`,
        );

        if (response.status !== 200) {
          setContent([]);
        } else {
          const parsedContent = {
            description: response.message.content,
            website: response.message.website,
            whitepaper: response.message.whitepaper,
          };
          setContent(parsedContent);
        }
      } catch (error) {
        console.log('Error trying to get introduction data: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchIntroductionContent();
  }, [coin]);

  if (!loading && (content === null || content.length === 0)) {
    handleSectionContent('introduction', true);
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : content === null ? (
        <NoContentMessage hasSectionName={false} />
      ) : (
        <>
          <Text style={styles.introText}>{content.description}</Text>
          <View style={styles.dataContainer}>
            <View style={styles.textContainer}>
              <Image
                style={styles.starSymbol}
                resizeMode="contain"
                source={require('../../../../../../../../assets/images/fundamentals/star-icon.png')}
              />
              <ExternalLink url={content.website} text={'Website'} />
            </View>
            <View style={styles.textContainer}>
              <Image
                style={styles.starSymbol}
                resizeMode="contain"
                source={require('../../../../../../../../assets/images/fundamentals/star-icon.png')}
              />
              <ExternalLink url={content.whitepaper} text={'Whitepaper'} />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Introduction;
