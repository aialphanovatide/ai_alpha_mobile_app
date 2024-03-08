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
  if (hasEmptyContent === true) {
    return <></>;
  }

  return (
    <View style={styles.subSection}>
      <View style={styles.row}>
        <Text style={styles.subTitle}>{subtitle}</Text>
        {hasAbout && (
          <AboutIcon
            handleAboutPress={handleAboutPress}
            description={description}
          />
        )}
      </View>
      <View style={styles.subSectionContent}>{content}</View>
    </View>
  );
};

export default SubSection;
