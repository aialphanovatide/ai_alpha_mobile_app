import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import useMenuItemStyles from './menuItemStyles';
import FastImage from 'react-native-fast-image';

const MenuItem = ({onPress, category, isActive, isDarkMode}) => {
  const styles = useMenuItemStyles();
  const adaptedCategoryName = category.category_name
    .replace(/\s/g, '')
    .toLowerCase();
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.buttonContainer}
      onPress={() => onPress(category)}>
      <View style={[styles.button]}>
        <FastImage
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/${
              isDarkMode ? 'Dark' : 'Light'
            }/${isActive ? 'Active' : 'Inactive'}/${adaptedCategoryName}.png`,
            width: 60,
            height: 60,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.web,
          }}
          resizeMode={FastImage.resizeMode.contain}
          style={[styles.imageIcon]}
          fadeDuration={100}
          fallback={true}
        />
      </View>

      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.buttonText}>
        {category.category_name}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
