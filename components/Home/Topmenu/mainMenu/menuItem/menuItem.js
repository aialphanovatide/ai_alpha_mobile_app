import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import styles from './menuItemStyles';
// import {CATEGORIES_BASE_URL} from '../../../../../services/aiAlphaApi';
// import menuData from '../menuData';

const MenuItem = ({
  onPress,
  icon,
  category,
  isActive,
  isDarkMode,
  findCategoryInMenuData,
}) => {
  // const option = findCategoryInMenuData(category, menuData);
  // console.log(option);
  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => onPress(category)}>
      <View style={styles.button}>
        <Image
          source={
            require('../../../../../assets/images/topMenu/bitcoin.png')
            // isDarkMode
            //   ? isActive
            //     ? require(option.iconImage.dark.active)
            //     : require(option.iconImage.dark.inactive)
            //   : isActive
            //   ? require(option.iconImage.light.active)
            //   : require(option.iconImage.light.inactive)
          }
          // source={{uri: `${CATEGORIES_BASE_URL}${icon}`}}
          resizeMode="contain"
          style={styles.imageIcon}
        />
      </View>

      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.buttonText}>
        {category.category}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;
