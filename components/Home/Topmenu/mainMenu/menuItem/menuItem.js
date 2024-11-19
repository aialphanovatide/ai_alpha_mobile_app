import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import useMenuItemStyles from './menuItemStyles';
import FastImage from 'react-native-fast-image';

// Component for the menu items rendered in the top menu, each item is a category that can be selected by the user and can display a set of coins that belong to that category in a subsequent menu. It receives the following props: onPress, category, isActive, isDarkMode.

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
