import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import MenuItem from './menuItem/menuItem'
import styles from './topmenuStyles';
import { TopMenuContext } from '../../../../context/topMenuContext';
import {getService} from '../../../../services/aiAlphaApi'

const TopMenu = () => {

  const { updateActiveCoin } = useContext(TopMenuContext);
  const [categories, setCategories] = useState([])

  const handleButtonPress = (category) => {
    updateActiveCoin(category)
  }

  useEffect(() => {

    const fetchCategories = async () => {
      try {
        const data = await getService('/get_categories');
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };
    fetchCategories()
  }, []); 


  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <MenuItem
            key={category.category_id}
            icon={category.category}
            onPress={() => handleButtonPress(category)}
            category={category}
            isActive={category.is_active}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default TopMenu;


