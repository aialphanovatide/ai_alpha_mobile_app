import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './submenuItemStyles';
import HorizontalMenu from '../InMenu/inMenu';


const SubMenu = ({ options }) => {

  const [activeOption, setActiveOption] = useState(options[1]?.id || null);
  
  const handleCoinPress = ({id, coin}) => {
    setActiveOption(id)
  };

    return (
      <View style={styles.menu}>
      <View style={styles.subMenu}>
        {options.map(({id, coin, imageUri}) => (
          <TouchableOpacity
            key={id}
            style={[
              styles.subMenuButton,
              activeOption === id && styles.activeButton,
            ]}
            onPress={() => handleCoinPress({id, coin})}
          >
            <View style={styles.buttonContainer}>
            <Image source={{ uri: imageUri }} style={styles.buttonImage} />
            <Text style={[styles.buttonText, activeOption === id && styles.activeButtonText]}>{coin}</Text>
          </View>
          </TouchableOpacity>
        ))}
      </View>
      {activeOption !== null && <HorizontalMenu />}
      </View>
    );
  };

export default SubMenu