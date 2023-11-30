import React, { useContext, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import MenuItem from './menuItem/menuItem'
import SubMenu from './subMenuItem/subMenuItem';
import styles from './topmenuStyles';
import menuData from './menuData';
import { TopMenuContext } from '../../context/topMenuContext';
import HorizontalMenu from './InMenu/inMenu';

const Menu = () => {

  const [showSubMenu, setShowSubMenu] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const { sharedData, updateSharedData } = useContext(TopMenuContext);

  const updateData = (newData) => {
    updateSharedData((prevState) => ({
      ...prevState,
      data: newData,
    }));
  };

  const updateActiveStatus = (newStatus) => {
    updateSharedData((prevState) => ({
      ...prevState,
      active: newStatus,
    }));
  };

  const handleButtonPress = (menuItem) => {
    if (menuItem.subMenuOptions) {
      updateData('charts')
      setShowSubMenu(!showSubMenu); // Show or not the menu
      setActiveMenuItem(menuItem); // Sets the clicked coin
      updateActiveStatus(!sharedData.active) // Share the status to know what component should render
    } else {
      setShowSubMenu(!showSubMenu);
      setActiveMenuItem(null);
      updateActiveStatus(!sharedData.active) 
      updateData('charts')
    }
  };

  const renderSubMenu = () => {
    if (showSubMenu && activeMenuItem && activeMenuItem.subMenuOptions && sharedData.active) {
      return <SubMenu options={activeMenuItem.subMenuOptions} />;
    } else if (showSubMenu ) {
        return <HorizontalMenu />
    }
    return null
  };


  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {menuData.map(({id, icon, subMenuOptions, isActive}) => (
          <MenuItem
            key={id}
            icon={icon}
            onPress={() => handleButtonPress({ id, icon, subMenuOptions, isActive })}
            subMenuOptions={subMenuOptions}
            isActive={isActive}
          />
        ))}
      </ScrollView>
      {renderSubMenu()}
    </View>
  );
};

export default Menu;


