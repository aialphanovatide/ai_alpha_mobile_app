import React, { useContext } from 'react';
import { View, ScrollView } from 'react-native';
import MenuItem from './menuItem/menuItem'
import styles from './topmenuStyles';
import menuData from './menuData';
import { TopMenuContext } from '../../../../context/topMenuContext';

const TopMenu = () => {

  const { updateActiveCoin } = useContext(TopMenuContext);

  const handleButtonPress = (category) => {
    updateActiveCoin(category)
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {menuData.map((category) => (
          <MenuItem
            key={category.id}
            icon={category.icon}
            onPress={() => handleButtonPress(category)}
            category={category}
            isActive={category.isActive}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TopMenu;


