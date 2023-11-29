import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import styles from './inMenuStyles';
import { TopMenuContext } from '../../../context/topMenuContext';

const HorizontalMenu = () => {
  const [activeTab, setActiveTab] = useState('Charts');
  const { updateSharedData } = useContext(TopMenuContext);

  const updateData = (newData) => {
    updateSharedData((prevState) => ({
      ...prevState,
      data: newData,
    }));
  };

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    updateData(tab)
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Fundamentals' && styles.activeTab]}
          onPress={() => handleTabPress('Fundamentals')}
        >
          <Text style={[styles.tabText, activeTab === 'Fundamentals' && styles.activeTabtext]}>Fundamentals</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Charts' && styles.activeTab]}
          onPress={() => handleTabPress('Charts')}
        >
          <Text style={[styles.tabText, activeTab === 'Charts' && styles.activeTabtext]}>Charts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'News' && styles.activeTab]}
          onPress={() => handleTabPress('News')}
        >
          <Text style={[styles.tabText, activeTab === 'News' && styles.activeTabtext]}>News</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default HorizontalMenu;
