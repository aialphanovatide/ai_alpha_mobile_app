import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './CompetitorsStyles';

const MenuItem = ({item, activeOption, handleOptionChange}) => {
  return (
    <TouchableOpacity onPress={() => handleOptionChange(item)}>
      <View style={styles.menuItemContainer}>
        {item.icon && (
          <Icon
            style={styles.itemIcon}
            name={item.icon}
            size={15}
            color={activeOption.name === item.name ? 'orange' : 'gray'}
          />
        )}
        <Text
          style={[
            styles.menuItemName,
            activeOption.name === item.name && styles.activeItem,
          ]}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const CompetitorsMenu = ({options, activeOption, handleOptionChange}) => {
  return (
    <View style={styles.menuContainer}>
      {options.map((item, index) => (
        <MenuItem
          key={index}
          item={item}
          activeOption={activeOption}
          handleOptionChange={handleOptionChange}
        />
      ))}
    </View>
  );
};

const Competitors = ({options, content}) => {
  return (
    <View>
      <CompetitorsMenu
        options={options}
        activeOption={options[0]}
        handleOptionChange={() => {
          console.log('Changing options');
        }}
      />
    </View>
  );
};

export default Competitors;
