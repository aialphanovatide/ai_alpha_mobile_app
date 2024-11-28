import {Image, Linking, Platform, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import useIntroductionStyles from './IntroductionStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import {AppThemeContext} from '../../../../../../../../context/themeContext';
import SkeletonLoader from '../../../../../../../Loader/SkeletonLoader';
import {useSelector} from 'react-redux';
import {fundamentalsState} from '../../../../../../../../store/fundamentalsSlice';
import NoContentDisclaimer from '../../../../../../../NoContentDisclaimer/NoContentDisclaimer';

// Component to render an external link in the Introduction section of the Fundamentals tab. It displays a link to the website or whitepaper of the coin.

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

// Component to render the Introduction section in the Fundamentals tab. It displays the description of the coin and links to the website and whitepaper.

const Introduction = ({coin, handleSectionContent, loading, globalData}) => {
  const styles = useIntroductionStyles();
  const {theme, isDarkMode} = useContext(AppThemeContext);
  const isAndroid = Platform.OS === 'android' ? true : false;

  const systemFonts = [
    ...defaultSystemFonts,
    isAndroid ? 'prompt_regular' : 'Prompt-Regular',
    isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
  ];
  const parseHtmlTags = content => {
    const replacedContent = content.replace(/\\/g, '');
    const strong_changed_content = replacedContent
      .replace(
        /<strong style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
        `<span style="color: ${
          isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
        };" class="bold";>`,
      )
      .replace(/<\/strong>/g, '</span>')
      .replace(/strong/g, 'span')
      .replace(
        /style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);"/g,
        `style="color: ${
          isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
        }";`,
      );
    return strong_changed_content;
  };

  const findHtmlContent = content => {
    const replacedContent = content.replace(/\\/g, '');
    const strong_changed_content = replacedContent
      .replace(
        /<strong style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
        `<span style="color: ${
          isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
        };" class="bold";>`,
      )
      .replace(/<\/strong>/g, '</span>')
      .replace(/strong/g, 'p');
    const paragraphs_changed = strong_changed_content.replace(
      /p style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);"/g,
      `p style="color: ${
        isDarkMode ? 'rgb(250, 250, 250) ' : 'rgb(64, 64, 64)'
      };"`,
    );

    const span_changed = paragraphs_changed.replace(
      /<span style="color: rgb\([0-9]+, [0-9]+, [0-9]+\);">/g,
      `<span style="color: ${
        isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(64, 64, 64)'
      };">`,
    );
    const bullet_lists_updated_content = span_changed.replace(
      /<ul>/g,
      `<ul style="color: ${
        isDarkMode ? 'rgb(255, 255, 255) ' : 'rgb(23, 23, 23)'
      };">`,
    );
    return bullet_lists_updated_content;
  };

  const html_styles = {
    span: {
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
      fontSize: theme.responsiveFontSize * 0.8,
    },
    p: {
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_regular' : 'Prompt-Regular',
      fontSize: theme.responsiveFontSize * 0.85,
    },
  };

  const classes_styles = {
    'ql-size-huge': {
      fontSize: theme.responsiveFontSize * 1.5,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    'ql-size-large': {
      fontSize: theme.responsiveFontSize * 1.25,
      marginVertical: 4,
      color: theme.titleColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
    bold: {
      fontSize: theme.responsiveFontSize * 0.9,
      color: theme.textColor,
      fontFamily: isAndroid ? 'prompt_semibold' : 'Prompt-SemiBold',
    },
  };

  useEffect(() => {
    if (
      !loading &&
      (!globalData || globalData.introduction.message.content === undefined)
    ) {
      handleSectionContent('introduction', true);
    }
  }, [loading, globalData, handleSectionContent]);

  return (
    <View style={styles.container}>
      {loading ? (
        <SkeletonLoader type="text" quantity={8} />
      ) : (
        <>
          <RenderHTML
            source={{
              html: parseHtmlTags(globalData?.introduction?.message.content),
            }}
            contentWidth={theme.width - 50}
            systemFonts={systemFonts}
            tagsStyles={html_styles}
            classesStyles={classes_styles}
          />
          <View style={styles.dataContainer}>
            <View style={styles.textContainer}>
              <Image
                style={styles.starSymbol}
                resizeMode="contain"
                source={require('../../../../../../../../assets/images/fundamentals/star-icon.png')}
              />
              <ExternalLink
                url={globalData?.introduction.message.website}
                text={'Website'}
              />
            </View>
            <View style={styles.textContainer}>
              <Image
                style={styles.starSymbol}
                resizeMode="contain"
                source={require('../../../../../../../../assets/images/fundamentals/star-icon.png')}
              />
              <ExternalLink
                url={globalData?.introduction.message.whitepaper}
                text={'Whitepaper'}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Introduction;
