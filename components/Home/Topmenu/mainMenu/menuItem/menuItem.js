import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import useMenuItemStyles from './menuItemStyles';
import {API_BASE_URL} from '../../../../../services/aiAlphaApi';
import {TOP_MENU_IMAGES_URL} from '../../../../../src/constants';
import FastImage from 'react-native-fast-image';

const MenuItem = ({
  onPress,
  category,
  isActive,
  isDarkMode,
  findCategoryInMenuData,
}) => {
  const styles = useMenuItemStyles();
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => onPress(category)}>
      <View style={[styles.button]}>
        <FastImage
          source={{
            uri: `https://aialphaicons.s3.us-east-2.amazonaws.com/${
              isDarkMode ? 'Dark' : 'Light'
            }/${isActive ? 'Active' : 'Inactive'}/${category.category_name
              .replace(/\s/g, '')
              .toLowerCase()}.png`,
            width: 60,
            height: 60,
            priority: FastImage.priority.high,
          }}
          resizeMode="contain"
          style={styles.imageIcon}
          fadeDuration={100}
          fallback={true}
          // alt={category.category_name}
        />
      </View>

      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.buttonText}>
        {category.category_name}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
