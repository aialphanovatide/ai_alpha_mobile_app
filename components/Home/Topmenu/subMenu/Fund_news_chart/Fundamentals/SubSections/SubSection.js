import {Image, Text, View} from 'react-native';
import React from 'react';
import useFundamentalsStyles from '../FundamentalsStyles';
import {AboutIcon} from '../AboutIcon';
import NoContentMessage from '../NoContentMessage/NoContentMessage';

const SubSection = ({
  subtitle,
  hasEmptyContent,
  content,
  hasAbout,
  handleAboutPress,
  description,
}) => {
  const styles = useFundamentalsStyles();
  const showContent = !hasEmptyContent;

  return (
    <View style={styles.subSection}>
      {showContent && (
        <>
          <View style={styles.row}>
            <Text style={styles.subTitle}>{subtitle}</Text>
            {hasAbout && (
              <AboutIcon
                title={subtitle}
                handleAboutPress={handleAboutPress}
                description={description}
              />
            )}
          </View>
          <View style={styles.subSectionContent}>{content}</View>
        </>
      )}
    </View>
  );
};

export default SubSection;
